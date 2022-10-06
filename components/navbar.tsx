import { NextPage } from "next";
import { Navbar } from "react-daisyui";
import Link from "next/link";
import { AccountDetails } from "../types/interfaces";
import { BsClipboard } from "react-icons/bs";

const SozlukNavbar: NextPage<AccountDetails> = ({
  address,
  balance,
  chainId,
}) => {
  function copyAddrToClipboard() {
    if (address) {
      navigator.clipboard.writeText(address);
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
      <Navbar.End>
        <div className="mx-5  p-0 flex items-center">
          <h3 className="italic mx-7 text-first">
            {address ? `Hesap: ${address}` : ""}{" "}
          </h3>
          <BsClipboard
            title="Hesabı panoya kopyala!"
            className="cursor-pointer -m-5 text-first"
            onClick={copyAddrToClipboard}
          />
        </div>
        <span title={balance || ""} className="italic mx-7  text-first">
          {balance ? `ETH Bakiye: ${balance.slice(0, 4)}... ` : ""}
        </span>
      </Navbar.End>
    </Navbar>
  );
};

export default SozlukNavbar;
