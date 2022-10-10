import { BigNumber, ethers } from "ethers";
import { ForumContract } from "./constants";
import { ethereum } from "./global";
import {  ESozlukError } from "./types/enums";
import { IAccount } from "./types/interfaces";
import { UserContext } from "./UserContext";



/**
 * @description This function determines if the given value is an error value.
 * @param value This can be a `SozlukError` or anything else. if the value contains SozlukError, this function will console.error the message. 
 * @returns If this value does not contain any error codes, it will return the value with a console.log message for testing.
 */
export function sozlukLogger(value: any): any {
    switch(value) {
        case ESozlukError.AccountNotRequested: {
            console.error(value);
            break;
        }
        case ESozlukError.NoAccount: {
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


export async function requestAccount() {
      await window.ethereum.request?.({ method: "eth_requestAccounts" });
}


export async function createPost(title: string, description: string) {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    
    const contract = new ethers.Contract(ForumContract.address, ForumContract.json.abi, signer);
    await contract.createPost(title, description);
    
    const postCount = await contract.getPostCount() ;

    return postCount ;
    
}

export async function getPostCount() {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    
    const contract = new ethers.Contract(ForumContract.address, ForumContract.json.abi, signer);
    const postCount = ethers.utils.formatUnits(await contract.getPostCount(), 0) ;
    return postCount;
    
}
export async function getPost(postId: number) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    
    const contract = new ethers.Contract(ForumContract.address, ForumContract.json.abi, signer);
    
    const post = await contract.getPost(postId) ;

    return post ;
    

}


export async function listenMetamask(): Promise<{
    accountDisconnected: boolean
}> {
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
        console.log("Accounts has been changed: ", accounts);
        if(!accounts[0]) {

        return {
            accountDisconnected: true
        };
        }
        else {
        return {
            accountDisconnected: false 
        };
        }
    });
    return {accountDisconnected: false}
}