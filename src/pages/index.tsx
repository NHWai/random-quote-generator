import { Inter } from "next/font/google";
import { fetchRandomQuote, selectQuotes } from "@/store/slices/quotesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import SliderList from "@/components/SliderList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center  ${inter.className}`}
    >
      <div className="text-3xl">Slider</div>
      <SliderList />
    </main>
  );
}
