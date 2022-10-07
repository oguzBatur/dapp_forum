import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SozlukNavbar from "../components/navbar";
import Dashboard from "../components/dashboard";
import { getAccountInfoFromMetamask } from "../functions";
import { SozlukError } from "../types/enums";
import { IAccount } from "../types/interfaces";

const Topic = () => {
  const [account, setAccount] = useState<IAccount>({
    address: "",
    balance: "",
    chainId: 0,
  });

  async function getAccount() {
    const account = await getAccountInfoFromMetamask();
    if (account === SozlukError.NoAccount) {
      console.error("No account!");
    } else {
      setAccount(account);
    }
  }

  useEffect(() => {
    getAccount();
  });

  const router = useRouter();
  const { pid } = router.query;
  return (
    <main>
      <SozlukNavbar
        address={account.address}
        balance={account.balance}
        chainId={account.chainId}
      />
      <Dashboard />
      <h1 className="text-center font-bold text-xl mt-5">{pid}</h1>
    </main>
  );
};

export default Topic;
