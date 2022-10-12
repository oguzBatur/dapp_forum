import "../styles/globals.css";
import type { AppProps } from "next/app";
import SozlukNavbar from "../components/navbar";
import Dashboard from "../components/dashboard";
import { UserContext, UserContextProvider } from "../UserContext";
import { useEffect, useContext, useCallback } from "react";
import { requestAccount } from "../functions";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("Root Fired Up");
    return () => {
      console.log("Root unmounted.");
    };
  });

  const userContext = useContext(UserContext);

  const checkCurrentUser = useCallback(() => {}, []);

  return (
    <UserContextProvider>
      <div className="grid h-screen grid-rows-6  grid-cols-6 bg-first">
        <SozlukNavbar />
        <Dashboard />
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
}

export default MyApp;
