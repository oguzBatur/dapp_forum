import Web3 from "web3";
import { Alerts, SozlukError } from "./types/enums";
import { AccountDetails } from "./types/interfaces";

export function checkMetamask() {
    if (window.ethereum) return true;
    else return false;
}

export async function getAccountInfo(): Promise<AccountDetails | SozlukError> {
    try {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        const balance = await web3.eth.getBalance(accounts[0]);
        const account: AccountDetails = {
            address: accounts[0],
            balance,
            chainId
        };
        return account;
    } catch (error) {
        return SozlukError.NoAccount;
    }
}
