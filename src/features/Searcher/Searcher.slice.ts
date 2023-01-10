import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state의 타입 정의
export interface SearcherState {
  text: string;
}

// state의 초기값 정의
const initialState: SearcherState = {
  text: "",
};

// slice 생성
export const searcherSlice = createSlice({
  name: "searcher",
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    initialize: (state) => {
      state.text = "";
    },
  },
});

// reducer의 action을 변수로 따로 추출하기
export const { update, initialize } = searcherSlice.actions;

// slice의 reducer
export default searcherSlice.reducer;
