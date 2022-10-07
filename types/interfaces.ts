export interface IAccount {
    address: string | undefined;
    chainId: number | undefined;
    balance: string | undefined;
}

export interface IContractDetails {
    address: string;
    json: any;
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