import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { handleRawChampList } from "./util";

const RIOT_BASE_URL = "https://ddragon.leagueoflegends.com";

// state 정의
export interface ChampState {
  key: number;
  id: string;
  name: string;
  tags?: string[];
  version: string;
}

export interface GameDataState {
  champList: ChampState[];
  verList: string[];
  langList: string[];
  current: {
    version: string;
    language: string;
  };
  status: "pending" | "fulfilled" | "rejected";
}

// initial state 정의
const initialState: GameDataState = {
  champList: [],
  verList: [],
  langList: [],
  current: {
    version: "",
    language: "ko_KR",
  },
  status: "fulfilled",
};

// API에서 불러와 업데이트하는 action 정의
export const fetchChampListAsync = createAsyncThunk(
  "gamedata/fetch/champion",
  async (fetchArgs: { version: string; language: string }) => {
    try {
      const data = await axios.get(
        `${RIOT_BASE_URL}/cdn/${fetchArgs.version}/data/${fetchArgs.language}/champion.json`
      );

      // raw data 전처리 후 slice의 payload로 넘김.
      return handleRawChampList(data);
    } catch (error) {
      // TODO: 에러 발생시 slice에서 rejected로 넘어가지지 않음.
      console.log({
        errorMessage: "Something wrong while fetch champion list data.",
      });
      return initialState;
    }
  }
);

export const fetchVerListAsync = createAsyncThunk(
  "gamedata/fetch/version",
  async () => {
    try {
      const data = await axios.get(`${RIOT_BASE_URL}/api/versions.json`);

      // slice의 payload로 넘김.
      return data.data;
    } catch (error) {
      // TODO: 에러 발생시 slice에서 rejected로 넘어가지지 않음.
      console.log({
        errorMessage: "Something wrong while fetch champion list data.",
      });
      return initialState;
    }
  }
);

export const fetchLangListAsync = createAsyncThunk(
  "gamedata/fetch/language",
  async (fetchArgs: { version: string; language: string }) => {
    try {
      const data = await axios.get(
        `${RIOT_BASE_URL}/${fetchArgs.version}/data/${fetchArgs.language}/champion.json`
      );

      // raw data 전처리 후 적용
      //   return handleRawChampList(data, fetchArgs.language);
    } catch (error) {
      // TODO: 에러 발생시 slice에서 rejected로 넘어가지지 않음.
      console.log({
        errorMessage: "Something wrong while fetch champion list data.",
      });
      return initialState;
    }
  }
);

// Slice 정의
export const gameDataSlice = createSlice({
  name: "gamedata",
  initialState: initialState,
  reducers: {
    initialize: () => {
      return initialState;
    },
    setVersion: (state, action) => {
      state.current.version = action.payload;
    },
    setLanguage: (state, action) => {
      state.current.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChampListAsync.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchChampListAsync.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.champList = action.payload as ChampState[];
    });
    builder.addCase(fetchChampListAsync.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(fetchVerListAsync.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchVerListAsync.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.verList = action.payload as string[];
    });
    builder.addCase(fetchVerListAsync.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

// action 추출
export const { initialize, setVersion, setLanguage } = gameDataSlice.actions;

// reducer 추출
export default gameDataSlice.reducer;
