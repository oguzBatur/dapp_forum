import { NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import { Navbar, Badge, Dropdown, Card } from "react-daisyui";
import Link from "next/link";
import { BsClipboard } from "react-icons/bs";
import { UserContext } from "../UserContext";
import { IAccount } from "../types/interfaces";

const SozlukNavbar: NextPage<{
  connectToMeta: () => Promise<IAccount | undefined>;
}> = ({ connectToMeta }) => {
  function copyAddrToClipboard() {
    if (userContext && userContext.user) {
      navigator.clipboard.writeText(userContext.user.address);
    }
  }
  const userContext = useContext(UserContext);

  const [showElements, setShowElements] = useState(false);

  function checkMetamaskButton() {
    if (userContext && !userContext.user) {
      return (
        <Badge
          onClick={() => {
            connectToMeta().then((val) => {
              if (val) {
                userContext.setUser(val);
              }
            });
          }}
          color="primary"
          className=" ml-20 cursor-pointer px-5 py-5 font-bold "
        >
          Metamask İle Giriş Yap
        </Badge>
      );
    }
  }

  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (!accounts[0]) {
        userContext?.setUser(null);
      }
    });
    if (userContext && userContext.user) {
      userContext.setUser(userContext.user);
    }
  });

  function newEntryButton() {
    if (userContext && userContext.user) {
      return (
        <Link href={"/gonderi/gonderi_olustur"}>
          <Badge className=" ml-20 cursor-pointer px-10 py-5 bg-first font-bold text-third">
            Yeni Entry Oluştur
          </Badge>
        </Link>
      );
    } else
      return (
        <Dropdown>
          <Badge className="mx-3 cursor-pointer px-10 py-5 bg-first font-bold text-third">
            Yeni Entry Oluştur
          </Badge>
          <Dropdown.Menu className="card compact rounded-box bg-third text-first">
            <Card.Body>
              <p>Entry girmeden önce giriş yapman gerekiyor!</p>
            </Card.Body>
          </Dropdown.Menu>
        </Dropdown>
      );
  }

  function clipboardCheck() {
    if (userContext && userContext.user) {
      return (
        <BsClipboard
          title="Hesabı panoya kopyala!"
          className="cursor-pointer -m-5 text-first"
          onClick={copyAddrToClipboard}
        />
      );
    }
  }
  return (
    <Navbar className="bg-third items-center gap-x-12 pr-8 shadow-md">
      <Navbar.Start>
        <Link href="/">
          <h1 className="font-bold  ml-4 text-first cursor-pointer text-xl ">
            Sansürsüz Sözlük
          </h1>
        </Link>
      </Navbar.Start>
      <Navbar.Center>
        <div className="mx-5  p-0 flex items-center">
          <h3 className="italic mx-7 text-first">
            {userContext && userContext.user
              ? `Hesap: ${userContext.user?.address}`
              : ""}
          </h3>
          {clipboardCheck()}
        </div>
        <span
          title={userContext?.user?.balance.toString() || ""}
          className="italic mx-7  text-first"
        >
          {userContext && userContext.user
            ? `ETH Bakiye: ${userContext.user.balance
                .toString()
                .slice(0, 4)}... `
            : ""}
        </span>
      </Navbar.Center>
      <Navbar.End>
        {checkMetamaskButton()}
        {newEntryButton()}
      </Navbar.End>
    </Navbar>
  );
};

export default SozlukNavbar;
