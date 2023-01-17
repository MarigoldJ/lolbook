import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ChampState, fetchChampListAsync } from "./ChampList.slice";

export default function ChampList() {
  const champList = useAppSelector(
    (state: RootState) => state.champList.champs
  );
  const version = useAppSelector((state: RootState) => state.champList.version);
  const dispatch = useAppDispatch();

  // 선택된 LOL Version.
  const handleVersion = (event: SelectChangeEvent<string>) => {
    console.log("Load LOL Version:", event.target.value);
    dispatch(
      fetchChampListAsync({ version: event.target.value, language: "ko_KR" })
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box about="패치버전 선택영역" display="flex" justifyContent="center">
        <FormControl sx={{ m: 3, minWidth: 120 }} size="small">
          <InputLabel id="lol-version">롤 패치버전</InputLabel>
          <Select
            labelId="lol-version"
            value={version}
            onChange={handleVersion}
            variant="standard"
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"12.13.1"}>12.13.1</MenuItem>
            <MenuItem value={"13.1.1"}>13.1.1</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid
        container
        about="챔피언 리스트 영역"
        spacing={0.2}
        columns={{ xs: 3, sm: 5, md: 7 }}
      >
        {champList.map((champ: ChampState) => (
          <Grid
            item
            key={`li_${champ.key}`}
            xs={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            about="챔피언박스"
          >
            <Button href={`/champion/${champ.id}`}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
                alt={`square_${champ.id}`}
                loading="lazy"
                width="100%"
              />
            </Button>
            <Typography>{champ.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
