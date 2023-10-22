import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "./Slide";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchRandomQuote,
  selectQuotes,
  clearQuery,
  clearSearchList,
  setGoToIdx,
  fetchBySlipId,
  setPrevIdx,
  goToSlide,
  setMainPageIdx,
} from "@/store/slices/quotesSlice";
import InteractionBar from "./InteractionBar";
import Modal from "./ModalBox";
import SearchByTerm from "./SearchByTerm";
import RippleBtn from "./RippleBtn";
import Loading from "./Loading";
import SliderLayout from "./SliderLayout";
import NavArrows from "./NavArrows";
import { useRouter } from "next/router";

interface Props {
  handleSet: React.Dispatch<React.SetStateAction<number>>;
}

const SliderList = ({ handleSet }: Props) => {
  const quotes = useAppSelector(selectQuotes);
  const dispatch = useAppDispatch();
  const sliderRef = useRef<Slider | null>(null);
  const [currIdx, setCurrIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [term, setTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const slipId = router.asPath.split("=")[1];
    if (quotes.idList.length === 0) {
      if (slipId) {
        dispatch(fetchBySlipId(slipId as string));
      } else {
        dispatch(fetchRandomQuote());
      }
    } else if (typeof quotes.mainPageIdx === "number" && sliderRef.current) {
      sliderRef.current.slickGoTo(quotes.mainPageIdx, false);
      dispatch(setMainPageIdx(null));
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    //if randomQuoteApi returns same slip, make another request after waiting for 1s
    if (quotes.randomQuoteApiStatus === "sameSlip") {
      timeoutId = setTimeout(() => dispatch(fetchRandomQuote()), 1000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [quotes.randomQuoteApiStatus]);

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(clearQuery());
      dispatch(clearSearchList());
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (typeof quotes.goToIdx === "number" && sliderRef.current) {
      sliderRef.current.slickGoTo(quotes.goToIdx, false);
    }
  }, [quotes.goToIdx]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTerm("");
    setIsModalOpen(false);
  };

  const handleRandom = () => {
    dispatch(setPrevIdx(currIdx));
    dispatch(fetchRandomQuote());
  };

  const settings = {
    speed: 500,
    infinite: false,
    touchMove: false,
    arrows: false,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "0",
    initialSlide: currIdx,
    beforeChange: (oldIdx: number, newIdx: number) => {
      setCurrIdx(newIdx);
      handleSet(newIdx);
      if (quotes.goToIdx !== null) {
        dispatch(setGoToIdx(null));
      }
    },
  };
  const handleNext = () => {
    if (typeof quotes.prevIdx === "number") {
      dispatch(setPrevIdx(null));
    }
    if (currIdx === quotes.idList.length - 1) {
      dispatch(fetchRandomQuote());
    } else {
      sliderRef.current?.slickNext();
    }
  };

  const handlePrev = () => {
    if (typeof quotes.prevIdx === "number") {
      dispatch(setGoToIdx(quotes.prevIdx));
      dispatch(setPrevIdx(null));
    } else {
      sliderRef.current?.slickPrev();
    }
  };

  return (
    <SliderLayout>
      <div className="flex justify-between items-baseline">
        <div onClick={openModal} className=" ml-2 cursor-pointer ">
          <RippleBtn classnames="px-2 py-1">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </RippleBtn>
        </div>
        <NavArrows
          showPrevArrow={currIdx ? true : false}
          showNextArrow={quotes.randomQuoteApiStatus === "idle" ? true : false}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>

      {quotes.randomQuoteApiStatus === "idle" ? (
        <Slider ref={sliderRef} {...settings}>
          {quotes.idList.map((item, idx) => (
            <Slide
              onClick={handleRandom}
              key={item}
              text={quotes.collection[item].advice}
            />
          ))}
        </Slider>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
      <InteractionBar currIdx={currIdx} />
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <SearchByTerm closeModal={closeModal} term={term} setTerm={setTerm} />
      </Modal>
    </SliderLayout>
  );
};

export default SliderList;
