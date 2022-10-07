import { ethers } from "hardhat";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import Web3 from "web3";
import { ForumContract } from "./addresses";
import {  SozlukError } from "./types/enums";
import { IAccount } from "./types/interfaces";

export function checkMetamask() {
    if (window.ethereum) return true;
    else return false;
}

export function getDefaultProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}


export async function getAccountInfoFromMetamask(): Promise<IAccount | SozlukError> {
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

// Create a post with the smart contract.
export async function createPost(title: string, description: string) {
    const provider = getDefaultProvider();
    
    const abi = [
        "function createPost(string memory _title, string memory _description) external"
    ]
    const contract = new ethers.Contract(ForumContract.address, abi, );
    contract
}

// Comment on a post with the given post id.
export async function commentOnPost(contract: Contract, postId: number) {

}

/**
 * @description This function determines if the given value is an error value.
 * @param value This can be a SozlukError or anything else. if the value contains SozlukError, this function will console.error the message. 
 * @returns If this value does not contain any error codes, it will return the value with a console.log message for testing.
 */
export function sozlukLogger(value: any): any {
    switch(value) {
        case SozlukError.AccountNotRequested: {
            console.error(value);
            break;
        }
        case SozlukError.NoAccount: {
            console.error(value);
            break;
        }
        default: {
            console.log("Sözlük Hatası Bulunamadı.");
            break;
        }
    }
    return value;
}