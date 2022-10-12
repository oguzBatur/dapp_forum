import React from "react";
import { IProps } from "../types/interfaces";

const Button = ({ children, onClick, title, className }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-lg  cursor-pointer px-10 py-5 bg-first hover:bg-blue-900 duration-300 font-bold text-white " +
        className
      }
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
