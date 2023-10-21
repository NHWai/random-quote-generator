import SliderList from "@/components/SliderList";
import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setGoToIdx, setMainPageIdx } from "@/store/slices/quotesSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [currIdx, setCurrIdx] = useState(0);
  const handleSet = (id: number) => {
    dispatch(setMainPageIdx(id));
  };
  return (
    <MainLayout>
      <div className="md:text-5xl text-3xl mb-4 text-center">
        Random Quote Generator
      </div>
      <Link
        onClick={() => handleSet(currIdx)}
        href="/favquotes"
        className="mb-6 block  text-blue-500 text-center"
      >
        Go To Favorite Quotes &#8594;
      </Link>
      <SliderList handleSet={setCurrIdx} />
    </MainLayout>
  );
}
