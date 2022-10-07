import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Hero, Alert } from "react-daisyui";
import SozlukNavbar from "../components/navbar";
import { IAccount } from "../types/interfaces";
import { Alerts, SozlukError } from "../types/enums";

// Components
import Dashboard from "../components/dashboard";
import { getAccountInfoFromMetamask, sozlukLogger } from "../functions";

const Home: NextPage = () => {
  // Alert field to inform users about actions.
  const [alertField, setAlertField] = useState(
    <Alert className="w-full" status={"info"}>
      Block zincirine Bağlanılınıyor...
    </Alert>
  );

  // Check if metamask extension is installed.
  const checkMetamaskExtension = () => {
    if (window.ethereum) return true;
    else return false;
  };

  const [account, setAccount] = useState<IAccount>({
    address: undefined,
    balance: undefined,
    chainId: undefined,
  });
  //const [web3, setWeb3] = useState<Web3 | undefined>(); // Probably won't use it.

  async function checkAndConnectToMetamask() {
    if (checkMetamaskExtension()) {
      // Get Account Info.
      await window.ethereum.request?.({
        method: "eth_requestAccounts",
      });
      const account = await getAccountInfoFromMetamask();
      // Perform switch case for enum types. default means that this is not an enum and it should be treated as a type.
      const accountRes = sozlukLogger(account) as IAccount;
    } else {
      // If there is no Metamask installed, set alert accordingly.
      setAlerts(Alerts.NoMetaMask);
    }
  }

  // Sets alert field proporties.
  const setAlerts = (alertType: Alerts) => {
    switch (alertType) {
      case Alerts.Connected: {
        setAlertField(
          <Alert status="info" className="text-sm w-full">
            {"Hoşgeldin"} {account!.address}
            {"!"}
          </Alert>
        );

        break;
      }
      case Alerts.NoMetaMask: {
        setAlertField(
          <Alert status="warning" className="text-sm w-full">
            {"Metamask yüklü değil."}
            <a
              className="text-blue-900 underline"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target={"_blank"}
              rel="noreferrer"
            >
              {"Buraya tıklayarak indirebilirsiniz."}
            </a>
          </Alert>
        );
        break;
      }
      case Alerts.MetaMask: {
        setAlertField(
          <Alert status="info" className="text-sm w-full">
            {"Metamask yüklü. Yukarıdaki tuşa basarak giriş yapabilirsiniz."}
          </Alert>
        );
        break;
      }
    }
    if (checkMetamaskExtension()) {
    } else {
    }
  };

  useEffect(() => {
    checkAndConnectToMetamask();
  });

  return (
    <div>
      <Head>
        <title>Sansürsüz Sözlük</title>
        <meta name="description" content="Sansürsüz Sözlük" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-third">
        <SozlukNavbar
          address={account.address}
          balance={account.balance}
          chainId={account.chainId}
        />
        <Dashboard />
        <Hero className="h-screen">
          <Hero.Overlay className="bg-opacity-50" />
          <Hero.Content className="text-center">
            <div className="max-w-md">
              <h1 className="text-5xl text-first font-bold text-white">
                {"Sansürsüz Sözlük"}
              </h1>
              <p className="mt-2 text-third">
                {"Block Zinciri Teknolojisi ile üretilmiş, kontrol edilmeyen,"}
                <strong className="text-lg text-first">
                  <i> {"sansürsüz sözlük."}</i>
                </strong>
              </p>
              {(() => {
                if (!account.address) {
                  // If address is undefined, return <Button/>.
                  return (
                    <Button
                      onClick={checkAndConnectToMetamask}
                      color="primary"
                      className="m-5"
                      size="md"
                    >
                      {"Meta Mask ile Giriş Yap"}
                    </Button>
                  );
                }
              })()}
              {alertField}
            </div>
          </Hero.Content>
        </Hero>
      </main>
    </div>
  );
};

export default Home;
