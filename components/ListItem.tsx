import React from "react";

type Props = {
  title?: string;
  children: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const List: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="bg-button hover:bg-second  cursor-pointer p-2 duration-300 text-white ">
      {children}
    </div>
  );
};

export default List;
