import { useEffect, useRef, useState } from "react";
import { fetchByTerm, selectQuotes } from "@/store/slices/quotesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import SearchResult from "./SearchResult";
import Loading from "./Loading";
import { goToSlide } from "@/store/slices/quotesSlice";

interface Props {
  closeModal: () => void;
  term: string;
  setTerm: (value: React.SetStateAction<string>) => void;
}

const SearchByTerm = ({ closeModal, term, setTerm }: Props) => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTerm = term.trim();
    if (trimmedTerm) {
      dispatch(fetchByTerm(term));
    }
  };

  const handleChoose = (id: number, advice: string) => {
    dispatch(goToSlide({ id, advice }));
    closeModal();
  };

  return (
    <div className="relative h-full w-full py-7 px-3 ">
      <span
        onClick={closeModal}
        className="modal-close absolute top-0 right-3 text-3xl text-red-600 cursor-pointer"
      >
        &times;
      </span>
      <form onSubmit={handleSubmit}>
        <input
          ref={ref}
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          className="w-full border border-black focus:outline-none rounded-full px-4 py-2 text-xs mt-3 "
          placeholder="search by character or word or phrase"
        />
      </form>
      <div className="text-xs mt-2 mb-4">
        Result Count : {term !== "" && quotes.searchList.length}
      </div>
      <div className="overflow-auto relative h-3/4 text-sm">
        {quotes.fetchByTermApiStatus === "loading" ? (
          <div className="mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        ) : quotes.fetchByTermApiStatus === "idle" ? (
          quotes.searchList.length > 0 ? (
            quotes.searchList.map((item) => (
              <SearchResult
                key={item.id}
                advice={item.advice}
                term={quotes.query}
                id={item.id}
                handleChoose={handleChoose}
              />
            ))
          ) : (
            term !== "" && <div>No Results Found</div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default SearchByTerm;
