import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "./Slide";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchRandomQuote, selectQuotes } from "@/store/slices/quotesSlice";

interface Props {
  children?: React.ReactNode;
}

const SliderList = ({ children }: Props) => {
  const quotes = useAppSelector(selectQuotes);
  const dispatch = useAppDispatch();
  const [currIdx, setCurrIdx] = useState(0);

  const settings = {
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    beforeChange: (curr: number, next: number) => {
      setCurrIdx(next);
      if (quotes.status === "idle") {
        dispatch(fetchRandomQuote());
      }
    },
  };

  return (
    <div className="max-w-[800px] h-[400px] overflow-hidden w-screen border border-red-500 p-20 bg-black text-white">
      <Slider {...settings}>
        {quotes.list.map((item, idx) => (
          <Slide
            key={item.id}
            text={item.advice}
            extraclasses={`${idx === currIdx ? "slide activeSlide" : "slide"}`}
            // extraclasses={``}
          />
        ))}
      </Slider>
    </div>
  );
};

export default SliderList;
