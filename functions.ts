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

export async function getAccountFromMetamask() {
  try {
    if (await requestAccount()) {
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
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error has occured when trying to get metamask account: ",
        error
      );
    }
  }
}

// Get account information from metamask. if there is  an account, return true. Otherwise return false.
export async function requestAccount() {
  const req = window.ethereum.request?.({ method: "eth_requestAccounts" });
  if (req !== undefined) {
    return true;
  } else {
    return false;
  }
}

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

export async function getComments(postId: number) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    ForumContract.address,
    ForumContract.json.abi,
    signer
  );

  const commentIds = await contract.getAllComments(postId);
  console.log(commentIds);
}

async function getComment(commentId: number) {}

export async function getPostCount() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      ForumContract.address,
      ForumContract.json.abi,
      signer
    );
    const postCount = ethers.utils.formatUnits(
      await contract.getPostCount(),
      0
    );
    return postCount;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error when trying to get post count: ", error.message);
    }
  }
}
export async function getPost(postId: number) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    ForumContract.address,
    ForumContract.json.abi,
    signer
  );

  const post = await contract.getPost(postId);

  return post;
}

export const checkLocalStorage = (): boolean => {
  const address = localStorage.getItem("_user-acc");
  return address ? true : false;
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

export async function listenMetamask(): Promise<{
  accountDisconnected: boolean;
}> {
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

export async function removeMetamaskListener() {
  window.ethereum.removeListener("accountsChanged", (acc: any) => {
    console.log(acc);
  });
}
