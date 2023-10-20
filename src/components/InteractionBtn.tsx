import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const InteractionBtn = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className="active:motion-safe:animate-ping">
      {children}
    </button>
  );
};

export default InteractionBtn;
