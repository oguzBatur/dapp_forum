import { BigNumber, ethers } from "ethers";
import { ForumContract } from "./constants";
import { ethereum } from "./global";
import { ESozlukError } from "./types/enums";
import { IAccount } from "./types/interfaces";
import { UserContext } from "./UserContext";

/**
 * @description This function determines if the given value is an error value.
 * @param value This can be a `SozlukError` or anything else. if the value contains SozlukError, this function will console.error the message.
 * @returns If this value does not contain any error codes, it will return the value with a console.log message for testing.
 */
export function sozlukLogger(value: any): any {
  switch (value) {
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

//// Account related logic
export async function checkIfAccountConnected() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  try {
    await signer.getAddress();
    return true;
  } catch (error) {
    console.log("Error when trying to get address", error);
    return false;
  }
}

export async function getAccountFromMetamask() {
  try {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await signer.getBalance();
    const chainId = await signer.getChainId();
    const acc: IAccount = {
      address,
      balance,
      chainId,
    };
    return acc;
  } catch (error) {}
}

// Get account information from metamask. if there is  an account, return true. Otherwise return false.
async function requestAccount() {
  try {
    const req = await window.ethereum.request?.({
      method: "eth_requestAccounts",
    });
    if (req !== undefined) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
}

// Create a post with the given title and description.
export async function createPost(title: string, description: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    ForumContract.address,
    ForumContract.json.abi,
    signer
  );
  await contract.createPost(title, description);

  const postCount = await contract.getPostCount();

  return postCount;
}

// Comment Functions
//commentOnPost(uint _postId, string memory _comment)
export async function commentOnPost(postId: number, comment: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    ForumContract.address,
    ForumContract.json.abi,
    signer
  );

  await contract.commentOnPost(postId, comment);
}

export async function getComments(postId: number) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(
    ForumContract.address,
    ForumContract.json.abi,
    provider
  );

  const commentIds = await contract.getAllComments(postId);
  if (commentIds) {
    return commentIds;
  }
}

export async function getComment(commentId: number) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(
    ForumContract.address,
    ForumContract.json.abi,
    provider
  );
  const comment = await contract.getComment(commentId);
  if (comment) {
    return comment;
  }
}

export async function getPostCount() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      ForumContract.address,
      ForumContract.json.abi,
      provider
    );

    return ethers.utils.formatUnits(await contract.getPostCount(), 0);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error when trying to get post count: ", error.message);
    }
  }
}

export async function getPost(postId: number) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(
    ForumContract.address,
    ForumContract.json.abi,
    provider
  );

  return await contract.getPost(postId);
}

export const checkLocalStorage = (): boolean => {
  const address = localStorage.getItem("_user-acc");
  return !!address;
};
export const setLocalStorage = (acc: IAccount) => {
  localStorage.setItem(
    "_user-acc",
    JSON.stringify({
      address: acc.address,
      balance: acc.balance,
      chainId: acc.chainId,
    })
  );
};

export const getLocalStorage = () => {
  const acc = localStorage.getItem("_user-acc");
  if (acc) {
    JSON.parse(acc);
    return acc;
  }
};

export function metaMaskListener(): {
  accountDisconnected: boolean;
} {
  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    console.log("Accounts has been changed: ", accounts);
    if (!accounts[0]) {
      return {
        accountDisconnected: true,
      };
    } else {
      return {
        accountDisconnected: false,
      };
    }
  });
  return { accountDisconnected: false };
}

export function removeMetaMaskListener() {
  window.ethereum.removeListener("accountsChanged", (acc: any) => {
    console.log(acc);
  });
}
