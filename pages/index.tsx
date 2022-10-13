import type { NextPage } from "next";
import { useState } from "react";
import { EAlerts } from "../types/enums";

const Home: NextPage = () => {
  // Alert field to inform users about actions.
  const [alertField, setAlertField] = useState(
    <div className="w-full">Hoşgeldiniz, lütfen Metamask ile giriş yapın.</div>
  );


  return (
    <div className="row-start-2 w-full row-span-4 col-start-1 col-span-5  text-white flex items-center justify-center">
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
        </div>
      </main>
    </div>
  );
};

export default Home;
