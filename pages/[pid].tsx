import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import SozlukNavbar from "../components/navbar";

const Topic = () => {
    
    const [account, setAccount] = useState([""]);


    async function fetchAccountDetails() {
        const web3 = new Web3(window.ethereum);
        const account = await web3.eth.getAccounts();
        setAccount(account);
    }
    
    useEffect(() => {
        fetchAccountDetails();

    }, [])

    
    const router = useRouter();
    const {pid} = router.query;
    return(
        <main>
            <SozlukNavbar accountAddress={account} accountChainId={undefined} />
            <h1 className="text-center font-bold text-xl mt-5">{pid}</h1>
 
        </main>
    )

}

export default Topic;