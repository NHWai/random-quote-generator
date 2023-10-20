import React from "react";

interface Props {
  children: React.ReactNode;
  classnames: string;
}

const RippleBtn = ({ children, classnames }: Props) => {
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Create a ripple element
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");
    e.currentTarget.appendChild(ripple);

    // Calculate the size and position of the ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    // Remove the ripple element after the animation
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return (
    <button
      className={`relative rounded-md focus:outline-none ${classnames} overflow-hidden `}
      onClick={handleRipple}
    >
      {children}
    </button>
  );
};

export default RippleBtn;
