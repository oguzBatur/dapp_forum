import { BigNumber } from "ethers";

export interface IAccount {
    address: string;
    chainId: number;
    balance: BigNumber;
}


export interface INavbarAccount {
    address: string;
    balance: BigNumber;
    
}

export interface IContractDetails {
    address: string;
    json: any;
    abi: string[];
}

// general structure of a Post
export interface IPost {
    id: number;
    title: string;
    description: string;
    votes: number;
    creationTime: number;
    author: string;
}

export interface IPostArray {
    posts: IPost[]
}

// general structure of a comment.
export interface IComment {
    id: number;
    comment: string;
    creationTime: number;
    author: string;
}

export interface ICommentArray {
    comments: IComment[]
}
export interface IProps  {
  title?: string;
  children?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string 
};