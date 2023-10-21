import React, { useState } from "react";
import InteractionBtn from "./InteractionBtn";
import {
  addToFav,
  removeFromFav,
  selectQuotes,
} from "@/store/slices/quotesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Tooltip } from "./Tooltip";

interface Props {
  currIdx: number;
}

const SocialBar = ({ currIdx }: Props) => {
  const quotes = useAppSelector(selectQuotes);
  const dispatch = useAppDispatch();
  // const favListset = new Set(quotes.favList);
  const currSlipId = quotes.idList[currIdx];
  // const inFavList = favListset.has(currSlipId);
  const inFavList = quotes.favList.some((item) => item === currSlipId);

  const copyLink = () => {
    const textToCopy = `${window.location.origin}/?slipid=${currSlipId}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // console.log("copy successfully");
      })
      .catch((error) => {
        console.error("Copy failed:", error);
      });
  };

  const copyToClipboard = () => {
    const textToCopy = quotes.collection[currSlipId].advice;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // console.log("copy successfully");
      })
      .catch((error) => {
        console.error("Copy failed:", error);
      });
  };

  return (
    <div className=" w-[80%] max-w-[300px] px-2 mx-auto ">
      <div className="flex justify-evenly">
        <InteractionBtn
          onClick={() => {
            if (!inFavList) {
              //add to favlist
              dispatch(addToFav(currSlipId));
            } else {
              //remove from favlist
              dispatch(removeFromFav(currSlipId));
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={inFavList ? "red" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={inFavList ? "red" : "currentColor"}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </InteractionBtn>
        <Tooltip message="copied">
          <InteractionBtn onClick={copyToClipboard}>
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
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
          </InteractionBtn>
        </Tooltip>
        <Tooltip message="link copy to clipboard">
          <InteractionBtn onClick={copyLink}>
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
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </InteractionBtn>
        </Tooltip>
      </div>
    </div>
  );
};

export default SocialBar;
