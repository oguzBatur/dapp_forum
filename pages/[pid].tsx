import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SozlukNavbar from "../components/navbar";
import Dashboard from "../components/dashboard";
import { ESozlukError } from "../types/enums";
import { IAccount } from "../types/interfaces";
import { BigNumber } from "ethers";

const Topic = () => {
  useEffect(() => {});

  const router = useRouter();
  const { pid } = router.query;
  return (
    <main>
      <h1 className="text-center font-bold text-xl pt-5 ">{pid}</h1>
    </main>
  );
};

export default Topic;
