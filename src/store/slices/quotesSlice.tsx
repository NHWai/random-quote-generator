import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";

import { apiFetchRandomQuote } from "../apis/quotesApi";
type Status = "idle" | "loading" | "failed";

interface QuoteType {
  id: number;
  advice: string;
}

interface AppType {
  list: QuoteType[];
  favList: QuoteType[];
  status: Status;
  idList: number[];
}

const initialState: AppType = {
  list: [
    {
      id: 1,
      advice:
        "Remember that spiders are more afraid of you, than you are of them.",
    },
    {
      id: 2,
      advice:
        "Smile and the world smiles with you. Frown and you're on your own.",
    },
    { id: 3, advice: "Don't eat non-snow-coloured snow." },
  ],
  favList: [],
  status: "idle",
  idList: [1, 2, 3],
};

export const fetchRandomQuote = createAsyncThunk(
  "quotes/apiFetchRandomQuote",
  async () => {
    const response = await apiFetchRandomQuote();
    return response.json();
  }
);

const quoteSlice = createSlice({
  initialState,
  name: "quote",
  reducers: {
    addToFav: (state, action: PayloadAction<QuoteType>) => {
      state.favList.push(action.payload);
    },
    removeFromFav: (state, action: PayloadAction<number>) => {
      state.favList.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomQuote.fulfilled, (state, payload) => {
        const myset = new Set(state.idList);
        if (!myset.has(payload.payload.slip.id)) {
          state.status = "idle";
          console.log(payload.payload.slip.id);
          state.idList.push(payload.payload.slip.id);
          state.list.push(payload.payload.slip);
        } else {
          state.status = "idle";
        }
      })
      .addCase(fetchRandomQuote.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectQuotes = (state: RootState) => state.quotes;
export const quotesReducer = quoteSlice.reducer;
