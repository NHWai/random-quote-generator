import React from "react";

interface Props {
  text: string;
  extraclasses: string;
}

const Slide = ({ text, extraclasses }: Props) => {
  return (
    <div
      className={`border border-red-500  h-[200px] overflow-y-hidden m-4 p-4 flex flex-col justify-center text-center ${extraclasses}`}
    >
      {text}
    </div>
  );
};

export default Slide;
