import "../styles/globals.css";
import type { AppProps } from "next/app";
import SozlukNavbar from "../components/navbar";
import Dashboard from "../components/dashboard";
import {  UserContextProvider } from "../UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <div className=" min-h-screen w-full flex flex-col bg-first">
        <SozlukNavbar />
          <div className="flex min-h-[85vh] justify-end">
              <Component {...pageProps} />
              <Dashboard/>

          </div>
      </div>
    </UserContextProvider>
  );
}

export default MyApp;
