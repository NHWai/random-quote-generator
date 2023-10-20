import React from "react";
import RippleBtn from "./RippleBtn";

interface Props {
  advice: string;
  term: string;
  id: number;
  handleChoose: (id: number, advice: string) => void;
}

const SearchResult = ({ advice, term, id, handleChoose }: Props) => {
  function getHighlightedText(text: string, highlight: string) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === highlight.toLowerCase()
                ? "text-orange-500"
                : ""
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  }

  return (
    <div onClick={() => handleChoose(id, advice)} className="  mb-4  ">
      <RippleBtn classnames="bg-slate-200 flex w-full px-4 pt-5 pb-3">
        <div className="mr-1">&#x2022;</div>
        <div className="text-left">{getHighlightedText(advice, term)}</div>
      </RippleBtn>
    </div>
  );
};

export default SearchResult;
