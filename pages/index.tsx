import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Hero, Alert, Button } from "react-daisyui";
import SozlukNavbar from "../components/navbar";
import { IAccount } from "../types/interfaces";
import { EAlerts } from "../types/enums";
import { ethers } from "ethers";
// Components
import Dashboard from "../components/dashboard";

const Home: NextPage = () => {
  // Alert field to inform users about actions.
  const [alertField, setAlertField] = useState(
    <Alert className="w-full" status={"info"}>
      Hoşgeldiniz, lütfen Metamask ile giriş yapın.
    </Alert>
  );

  // Sets alert field proporties.
  const setAlerts = (alertType: EAlerts) => {
    switch (alertType) {
      case EAlerts.NoMetaMask: {
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
      case EAlerts.MetaMask: {
        setAlertField(
          <Alert status="info" className="text-sm w-full">
            {"Metamask yüklü. Yukarıdaki tuşa basarak giriş yapabilirsiniz."}
          </Alert>
        );
        break;
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Sansürsüz Sözlük</title>
        <meta name="description" content="Sansürsüz Sözlük" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-third">
        <Hero className="h-screen pl-44  overflow-hidden">
          <Hero.Overlay />
          <Hero.Content>
            <div>
              <h1 className="text-5xl my-5 text-first font-bold text-white">
                {"Sansürsüz Sözlük"}
              </h1>
              {alertField}
            </div>
          </Hero.Content>
        </Hero>
      </main>
    </div>
  );
};

export default Home;
