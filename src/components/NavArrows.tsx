import React from "react";
import RippleBtn from "./RippleBtn";

interface Props {
  showPrevArrow: boolean;
  showNextArrow: boolean;
  handleNext: () => void;
  handlePrev: () => void;
}

const NavArrows = ({
  showPrevArrow,
  showNextArrow,
  handleNext,
  handlePrev,
}: Props) => {
  return (
    <div className="text-white flex gap-3">
      <button disabled={!showPrevArrow} onClick={handlePrev}>
        <RippleBtn
          classnames={`px-2 py-1 ${!showPrevArrow && "text-slate-700"}  `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </RippleBtn>
      </button>

      <button disabled={!showNextArrow} onClick={handleNext}>
        <RippleBtn
          classnames={`px-2 py-1 ${!showNextArrow && "text-slate-700"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </RippleBtn>
      </button>
    </div>
  );
};

export default NavArrows;
