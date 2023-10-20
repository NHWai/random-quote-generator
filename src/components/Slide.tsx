import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
}

const Slide = ({ text, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={` h-[200px] overflow-y-auto flex flex-col justify-center text-center  cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default Slide;
