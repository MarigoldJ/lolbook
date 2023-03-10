import { configureStore } from "@reduxjs/toolkit";
import GameDataSlice from "../features/GameData/GameData.slice";
import SearcherSlice from "../features/Searcher/Searcher.slice";

// store 생성
export const store = configureStore({
  reducer: {
    searcher: SearcherSlice,
    gameData: GameDataSlice,
  },
});

// useSelector 사용 시 type으로 사용하기 위함.
export type RootState = ReturnType<typeof store.getState>;

// useDispatch를 명확히 사용하기 위함.
export type AppDispatch = typeof store.dispatch;
