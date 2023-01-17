import { Box, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { update } from "./Searcher.slice";

export default function Searcher() {
  // state에서 searcher의 text를 불러오도록 도와줌.
  const searcher = useAppSelector((state: RootState) => state.searcher.text);
  const dispatch = useAppDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(update(event.target.value));
  };

  return (
    <Box>
      <TextField
        id="searcher-input"
        label="검색할 챔피언명"
        variant="standard"
        value={searcher}
        onChange={handleChange}
      />
      <div>{searcher}</div>
    </Box>
  );
}
