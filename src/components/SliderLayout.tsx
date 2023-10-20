import React from "react";

interface Props {
  children: React.ReactNode;
}

const SliderLayout = ({ children }: Props) => {
  return (
    <div className="max-w-[800px] h-[360px] flex flex-col justify-between relative overflow-hidden w-full p-5 bg-black text-white">
      {children}
    </div>
  );
};

export default SliderLayout;
