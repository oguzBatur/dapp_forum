import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import Web3 from "web3";
import { ForumContract } from "./contractaddresses";
import { Alerts, SozlukError } from "./types/enums";
import { IAccount } from "./types/interfaces";

export function checkMetamask() {
    if (window.ethereum) return true;
    else return false;
}

export async function getAccountInfo(): Promise<IAccount | SozlukError> {
    try {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        const balance = await web3.eth.getBalance(accounts[0]);
        const account: IAccount = {
            address: accounts[0],
            balance,
            chainId
        };
        return account;
    } catch (error) {
        return SozlukError.NoAccount;
    }
}

export async function getForumContract(){
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(ForumContract.json, ForumContract.address);
    return contract;
    
}

// Create a post with the contract.
export async function createPost(contract: Contract) {
    
}

// Comment on a post with the given post id.
export async function commentOnPost(contract: Contract, postId: number) {

}