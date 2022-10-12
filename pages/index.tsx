import type { NextPage } from "next";
import { useState } from "react";
import { EAlerts } from "../types/enums";

const Home: NextPage = () => {
  // Alert field to inform users about actions.
  const [alertField, setAlertField] = useState(
    <div className="w-full">Hoşgeldiniz, lütfen Metamask ile giriş yapın.</div>
  );

  // Sets alert field proporties.
  const setAlerts = (alertType: EAlerts) => {
    switch (alertType) {
      case EAlerts.NoMetaMask: {
        setAlertField(
          <div className="text-sm w-full">
            {"Metamask yüklü değil."}
            <a
              className="text-blue-900 underline"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target={"_blank"}
              rel="noreferrer"
            >
              {"Buraya tıklayarak indirebilirsiniz."}
            </a>
          </div>
        );
        break;
      }
      case EAlerts.MetaMask: {
        setAlertField(
          <div className="text-sm w-full">
            {"Metamask yüklü. Yukarıdaki tuşa basarak giriş yapabilirsiniz."}
          </div>
        );
        break;
      }
    }
  };

  return (
    <div className="row-start-2 row-span-4 col-start-1 col-span-5  text-white flex items-center justify-center">
      <div>
        <title>Sansürsüz Sözlük</title>
        <meta name="description" content="Sansürsüz Sözlük" />
        <link rel="icon" href="/favicon.ico" />
      </div>
      <main>
        <div>
          <h1 className="text-5xl my-5 text- font-bold text-">
            {"Sansürsüz Sözlük"}
          </h1>
          {alertField}
        </div>
      </main>
    </div>
  );
};

export default Home;
