import { NextPage } from "next";
import { useContext, useEffect, useCallback } from "react";
import { UserContext } from "../UserContext";
import {
    checkIfAccountConnected,
    getAccountFromMetamask, removeMetaMaskListener,

} from "../functions";
import { useRouter } from "next/router";
import Button from "./Button";
import { ethers } from "ethers";

const SozlukNavbar: NextPage = () => {
  function copyAddrToClipboard() {
    if (userContext && userContext.user) {
      navigator.clipboard.writeText(userContext.user.address).then(
      );

    }
  }
  const userContext = useContext(UserContext);


  function checkMetamaskButton() {
    if (!userContext.user) {
      return (
        <Button
          onClick={() => {
              getAccountFromMetamask().then(account => {
                  userContext.setUser(account);
              }).catch(console.log);

          }}
          className="col-start-5 text-sm h-22 bg-blue-900 row-start-2 hover:bg-third "
        >
          <p>Metamask İle Giriş Yap</p>
        </Button>
      )
    }
  }


    const checkAndConnect = useCallback(() => {
        checkIfAccountConnected().then(isConnected => {
            if(isConnected) {
                getAccountFromMetamask().then(acc =>{
                    userContext.setUser(acc);
                }).catch(console.log)
            }
        }).catch(console.log)
    }, [userContext.setUser]);

  const metaListener = useCallback(() => {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (!accounts[0]) {
              userContext.setUser(null);
          }
      });

  }, []);


  useEffect(() => {
      checkAndConnect();
      metaListener();
      return(() => {
          removeMetaMaskListener();
      })
  }, []);

  function newEntryButton() {
    if (userContext.user) {
      return (
        <Button
          className="mr-2 col-start-6 row-start-2 h-22"
          onClick={() => navigeTo("/gonderi/gonderi_olustur")}
        >
          <p>Yeni Entry Oluştur</p>
        </Button>
      );
    } else
      return (
        <Button className="mr-2 col-start-6 row-start-2 h-22">
          <p>Yeni Entry Oluştur</p>
        </Button>
      );
  }

  const router = useRouter();

  function navigeTo(path: string) {

    if (path !== router.pathname) {
      router
        .push(path)
        .then((val) => {
          if (val) {
            console.log("Navigate to ", path);
          } else {
            console.log(val);
          }
        })
        .catch((err) => console.log("error on push: ", err));
    }
  }

  function returnCredentials() {
    if (userContext.user) {
      const balance = ethers.utils.formatUnits(userContext.user?.balance, 18);
      return (
        <>
          <span
            title={balance}
            className="italic mx-7 col-start-4 row-start-2  text-white"
          >
            ETH Bakiye: {balance.slice(0, 4)}...
          </span>
          <h3
            onClick={copyAddrToClipboard}
            className="italic col-start-3 row-start-2 cursor-pointer col-span-1 text-white"
          >
            Hesap: {userContext.user.address.slice(0, 16)}...
          </h3>
        </>
      );
    }
  }
  return (
    <div className="bg-second grid grid-cols-6 grid-rows-3 h-[15vh] row-start-1 row-span-1 col-start-1 col-span-6 items-center gap-x-12  shadow-md">
      <h1
        onClick={() => navigeTo("/")}
        className="font-bold col-start-1 row-start-2 row-span-1   text-center  text-white cursor-pointer text-2xl "
      >
        Sansürsüz Sözlük
      </h1>
      {returnCredentials()}
      {checkMetamaskButton()}
      {newEntryButton()}
    </div>
  );
};

export default SozlukNavbar;
