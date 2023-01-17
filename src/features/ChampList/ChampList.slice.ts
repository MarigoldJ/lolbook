import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const RIOT_BASE_URL = "https://ddragon.leagueoflegends.com/cdn";

// state 정의
export interface ChampState {
  key: string;
  id: string;
  name: string;
  title: string;
  blurb?: string;
  tags?: string[];
}

export interface ChampListState {
  champs: ChampState[];
  version: string;
  language: string;
  status: "idle" | "loading" | "failed";
}

const initialState: ChampListState = {
  champs: [],
  version: "",
  language: "ko_KR",
  status: "idle",
};

type rawChampListData = {
  data: Array<ChampState>;
  version: string;
};

const preprocessData = (
  data: rawChampListData,
  lang: string
): ChampListState => {
  // 이름 가나다 순으로 챔피언 리스트 정렬하기.
  const newList: Array<ChampState> = Object.values(data.data).sort(
    (a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  return {
    champs: newList,
    version: data.version,
    language: lang,
    status: "idle",
  };
};

export const fetchChampListAsync = createAsyncThunk(
  "champlist/fetch",
  async (fetchArgs: { version: string; language: string }) => {
    try {
      const { data }: { data: rawChampListData } = await axios.get(
        `${RIOT_BASE_URL}/${fetchArgs.version}/data/${fetchArgs.language}/champion.json`
      );

      // raw data 전처리 후 적용
      return preprocessData(data, fetchArgs.language);
    } catch (error) {
      // TODO: 에러 발생시 slice에서 rejected로 넘어가지지 않음.
      console.log({
        errorMessage: "Something wrong while fetch champion list data.",
      });
      return initialState;
    }
  }
);

export const champListSlice = createSlice({
  name: "champlist",
  initialState: initialState,
  reducers: {
    initialize: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChampListAsync.fulfilled, (state, action) => {
        console.log(`Champ List Updated! (version ${action.payload.version})`);
        state.champs = action.payload.champs;
        state.language = action.payload.language;
        state.status = action.payload.status;
        state.version = action.payload.version;
      })
      .addCase(fetchChampListAsync.rejected, (state) => {
        state.champs = initialState.champs;
        state.language = initialState.language;
        state.status = "failed";
        state.version = initialState.version;
      });
  },
});

// action 추출
export const { initialize } = champListSlice.actions;

// reducer 추출
export default champListSlice.reducer;
