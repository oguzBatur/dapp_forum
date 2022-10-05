import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Hero, Alert, Navbar, Dropdown, Input } from "react-daisyui";
import Lock from "../src/artifacts/contracts/Lock.sol/Lock.json";
import { ethers } from "hardhat";
import Web3 from "web3";
import default_img from "../user.png";

const lockContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Lock Smart Contract Address.

enum Alerts {
  Connected,
  NoMetaMask,
  MetaMask,
}

interface AccountDetails {
  accountName: string[];
  chainId: number;
}

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

  const [accounts, setAccounts] = useState<AccountDetails>({
    accountName: [""],
    chainId: 0,
  });
  //const [web3, setWeb3] = useState<Web3 | undefined>();

  async function checkAndConnectToMetamask() {
    if (checkMetamaskExtension()) {
      // Get Account Info.
      await window.ethereum.request?.({
        method: "eth_requestAccounts",
      });

      const web3 = new Web3(window.ethereum); // connect to the provider.
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      setAccounts({
        accountName: accounts,
        chainId: chainId,
      });
      setAlerts(Alerts.Connected);
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
            Hoşgeldin {accounts.accountName}!
          </Alert>
        );

        break;
      }
      case Alerts.NoMetaMask: {
        setAlertField(
          <Alert status="warning" className="text-sm w-full">
            Metamask yüklü değil.
            <a
              className="text-blue-900 underline"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target={"_blank"}
              rel="noreferrer"
            >
              Buraya tıklayarak indirebilirsiniz.
            </a>
          </Alert>
        );
        break;
      }
      case Alerts.MetaMask: {
        setAlertField(
          <Alert status="info" className="text-sm w-full">
            Metamask yüklü. Yukarıdaki tuşa basarak giriş yapabilirsiniz.
          </Alert>
        );
        break;
      }
    }
    if (checkMetamaskExtension()) {
    } else {
    }
  };

  const navbar = (
    <Navbar color="blue" className="justify-end items-center gap-x-12 pr-8">
      <Dropdown vertical="middle" horizontal="left">
        <Image
          className="rounded-full  bg-white"
          src={default_img}
          alt="default_image"
          width={34}
          height={34}
        ></Image>
        <Dropdown.Menu className="p-6">
          <div>
            <p className="font-bold">Adresiniz</p>
            <p className="italic">{accounts.accountName}</p>
          </div>
          <div>
            <p className="font-bold">Zincir Numarası</p>
            <p className="italic">{accounts.chainId}</p>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
  useEffect(() => {
    checkAndConnectToMetamask();
  }, []);

  return (
    <div>
      <Head>
        <title>Sansürsüz Sözlük</title>
        <meta name="description" content="Sansürsüz Sözlük" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {(() => {
          if (accounts.chainId > 0) {
            return navbar;
          }
        })()}
        <Hero className="h-screen">
          <Hero.Overlay className="bg-opacity-50" />
          <Hero.Content className="text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-white">
                Sansürsüz Sözlük
              </h1>
              <p className="mt-2">
                Block Zinciri Teknolojisi ile üretilmiş, kontrol edilmeyen,
                <strong className="text-lg">
                  <i> sansürsüz sözlük.</i>
                </strong>
              </p>
              {(() => {
                if (accounts.chainId < 0) {
                  return (
                    <Button
                      onClick={checkAndConnectToMetamask}
                      color="primary"
                      className="m-5"
                      size="md"
                    >
                      Meta Mask ile Giriş Yap
                    </Button>
                  );
                } else {
                  return (
                    <Input
                      className="w-full my-5"
                      placeholder="Konu Ara!"
                    ></Input>
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
