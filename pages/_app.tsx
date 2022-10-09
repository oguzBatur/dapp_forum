import "../styles/globals.css";
import type { AppProps } from "next/app";
import SozlukNavbar from "../components/navbar";
import Dashboard from "../components/dashboard";
import { UserContext, UserContextProvider } from "../UserContext";
import { useEffect, useContext, useState } from "react";
import { ethers } from "ethers";
import { requestAccount } from "../functions";
import { IAccount } from "../types/interfaces";
import { boolean } from "hardhat/internal/core/params/argumentTypes";

function MyApp({ Component, pageProps }: AppProps) {
  async function getAccountDetails() {
    if (window.ethereum && !userContext) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const _account = provider.getSigner();
      const address = await _account.getAddress();
      const balance = await _account.getBalance();
      const chainId = await _account.getChainId();

      const accInf: IAccount = {
        address,
        balance,
        chainId,
      };
      return accInf;
    }
  }

  const userContext = useContext(UserContext);

  return (
    <UserContextProvider>
      <SozlukNavbar connectToMeta={getAccountDetails} />
      <Dashboard />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
