import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  apiFetchRandomQuote,
  apiFetchByTerm,
  apiFetchBySlipId,
} from "../apis/quotesApi";

type Status = "idle" | "loading" | "failed" | "sameSlip";

export interface QuoteType {
  id: number;
  advice: string;
}

type CollectionObject = {
  [id: number]: {
    advice: string;
  };
};

interface AppType {
  collection: CollectionObject;
  favList: number[];
  searchList: QuoteType[];
  randomQuoteApiStatus: Status;
  fetchByTermApiStatus: Status;
  idList: number[];
  query: string;
  goToIdx: number | null;
  prevId: number | null;
}

const initialState: AppType = {
  collection: {},
  favList: [],
  searchList: [],
  randomQuoteApiStatus: "idle",
  fetchByTermApiStatus: "idle",
  idList: [],
  query: "",
  goToIdx: null,
  prevId: null,
};

export const fetchRandomQuote = createAsyncThunk(
  "quotes/apiFetchRandomQuote",
  async () => {
    const response = await apiFetchRandomQuote();
    return response.json();
  }
);

export const fetchByTerm = createAsyncThunk(
  "quotes/apiFetchByTerm",
  async (term: string) => {
    const response = await apiFetchByTerm(term);
    return response.json();
  }
);

export const fetchBySlipId = createAsyncThunk(
  "quotes/apiFetchBySlipId",
  async (slipid: string) => {
    const response = await apiFetchBySlipId(slipid);
    return response.json();
  }
);

const quoteSlice = createSlice({
  initialState,
  name: "quote",
  reducers: {
    addToFav: (state, action: PayloadAction<number>) => {
      state.favList.push(action.payload);
    },
    removeFromFav: (state, action: PayloadAction<number>) => {
      const findDelIdx = state.favList.findIndex(
        (item) => item === action.payload
      );
      state.favList.splice(findDelIdx, 1);
    },
    clearQuery: (state) => {
      state.query = "";
    },
    clearSearchList: (state) => {
      state.searchList = [];
    },
    setGoToIdx: (state, action: PayloadAction<null | number>) => {
      state.goToIdx = action.payload;
    },
    setPrevIdx: (state, action: PayloadAction<null | number>) => {
      state.prevId = action.payload;
    },
    goToSlide: (state, action: PayloadAction<QuoteType>) => {
      // const myset = new Set(state.idList);
      const isInList = state.idList.some((item) => item === action.payload.id);
      if (!isInList) {
        state.idList.push(action.payload.id);
        state.collection = {
          ...state.collection,
          [action.payload.id]: { advice: action.payload.advice },
        };
        state.goToIdx = state.idList.length - 1;
        console.log("not in curr array");
      } else {
        console.log("in curr array");
        const findIdx = state.idList.findIndex(
          (item) => item === action.payload.id
        );
        state.goToIdx = findIdx;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.randomQuoteApiStatus = "loading";
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        // const myset = new Set(state.idList);
        const isInList = state.idList.some(
          (item) => item === action.payload.slip.id
        );
        if (!isInList) {
          state.idList.push(action.payload.slip.id);
          state.collection = {
            ...state.collection,
            [action.payload.slip.id]: { advice: action.payload.slip.advice },
          };
          state.goToIdx = state.idList.length - 1;
          state.randomQuoteApiStatus = "idle";
        } else {
          console.log("sameSlip");
          state.randomQuoteApiStatus = "sameSlip";
        }
      })
      .addCase(fetchRandomQuote.rejected, (state) => {
        state.randomQuoteApiStatus = "failed";
      })
      .addCase(fetchBySlipId.pending, (state) => {
        state.randomQuoteApiStatus = "loading";
      })
      .addCase(fetchBySlipId.fulfilled, (state, action) => {
        state.idList.push(action.payload.slip.id);
        state.collection = {
          ...state.collection,
          [action.payload.slip.id]: { advice: action.payload.slip.advice },
        };
        state.goToIdx = state.idList.length - 1;
        state.randomQuoteApiStatus = "idle";
      })
      .addCase(fetchBySlipId.rejected, (state) => {
        state.randomQuoteApiStatus = "failed";
      })
      .addCase(fetchByTerm.pending, (state) => {
        state.fetchByTermApiStatus = "loading";
      })
      .addCase(fetchByTerm.fulfilled, (state, payload) => {
        state.fetchByTermApiStatus = "idle";
        if (payload.payload.slips) {
          state.query = payload.payload.query;
          state.searchList = payload.payload.slips;
        } else {
          state.searchList = [];
        }
      })
      .addCase(fetchByTerm.rejected, (state) => {
        state.fetchByTermApiStatus = "failed";
        state.searchList = [];
      });
  },
});

export const {
  clearQuery,
  clearSearchList,
  removeFromFav,
  addToFav,
  goToSlide,
  setGoToIdx,
  setPrevIdx,
} = quoteSlice.actions;

export const selectQuotes = (state: RootState) => state.quotes;
export const quotesReducer = quoteSlice.reducer;
