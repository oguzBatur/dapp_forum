import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { IPostArray } from "./types/interfaces";

type PostContextProviderProps = {
  children: ReactNode;
};
export const PostContext = createContext<IPostState | null>(null);

interface IPostState {
  post: IPostArray | null;
  setPost: Dispatch<SetStateAction<IPostArray | null>>;
}

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [post, setPost] = useState<IPostArray | null>(null);
  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};
