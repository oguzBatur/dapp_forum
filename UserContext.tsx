import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { IAccount } from "./types/interfaces";

type UserContextProviderProps = {
  children: ReactNode;
};
export const UserContext = createContext<IUserState | null>(null);

interface IUserState {
  user: IAccount | null;
  setUser: Dispatch<SetStateAction<IAccount | null>>;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<IAccount | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
