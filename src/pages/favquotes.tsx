import MainLayout from "@/components/MainLayout";
import React, { useEffect, useRef, useState } from "react";
import RippleBtn from "@/components/RippleBtn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromFav, selectQuotes } from "@/store/slices/quotesSlice";
import Link from "next/link";
import SearchResult from "@/components/SearchResult";
import { useRouter } from "next/router";

const NewSlider = () => {
  const router = useRouter();
  const quotes = useAppSelector(selectQuotes);
  const dispatch = useAppDispatch();
  const [character, setCharacter] = useState("");
  const [term, setTerm] = useState("");
  const searchBarRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    searchBarRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTerm = character.trim();
    setTerm(trimmedTerm);
  };

  const filteredFavId = (orgArr: number[], text: string) => {
    const pattern = new RegExp(text, "gi");
    return orgArr.filter((item) => {
      const advice = quotes.collection[item].advice;
      return pattern.test(advice);
    });
  };

  const filteredList =
    term === "" ? quotes.favList : filteredFavId(quotes.favList, term);

  return (
    <MainLayout>
      <div className="md:text-5xl text-3xl mb-4 text-center">
        Favorite Quotes
      </div>
      <div onClick={() => router.back()} className="mb-6">
        <RippleBtn classnames="px-4 py-2 text-blue-500">
          &#8592; Go Back To Main Page
        </RippleBtn>
      </div>
      <div className="w-full">
        {quotes.favList.length > 0 ? (
          <>
            <form className="mb-4" onSubmit={handleSubmit}>
              <input
                ref={searchBarRef}
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="search by word, character or phrase"
                className="block mx-auto w-full max-w-[400px] border border-black focus:outline-none rounded-full px-4 py-2 text-xs mt-3 "
              />
            </form>
            <div className="flex justify-between max-w-[400px] mx-auto mb-6">
              <div>
                <div className=" text-xs italic">searchterm: "{term}"</div>
                <div className=" text-xs italic">
                  result count: {filteredList.length}
                </div>
              </div>
              <div onClick={() => term && setTerm("")}>
                <RippleBtn
                  classnames={`text-xs italic text-red-500 px-2 py-1 border border-red-500 ${
                    !term && "invisible"
                  }`}
                >
                  Clear Filter
                </RippleBtn>
              </div>
            </div>
            <div>
              {filteredList.map((item) => (
                <div key={item} className="relative">
                  <div
                    className="absolute top-1 right-3 z-20 text-red-500 cursor-pointer"
                    onClick={() => dispatch(removeFromFav(item))}
                  >
                    &times;
                  </div>
                  <SearchResult
                    advice={quotes.collection[item].advice}
                    id={item}
                    term={term}
                    handleChoose={() => {}}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-3xl mt-10 italic">
            You've got no favourite quotes. Start adding one now!!
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NewSlider;
