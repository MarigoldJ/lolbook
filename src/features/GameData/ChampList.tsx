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
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  ChampState,
  fetchChampListAsync,
  fetchVerListAsync,
  setVersion,
} from "./GameData.slice";

export default function ChampList() {
  const champList = useAppSelector(
    (state: RootState) => state.gameData.champList
  );
  const verList = useAppSelector((state: RootState) => state.gameData.verList);
  const version = useAppSelector(
    (state: RootState) => state.gameData.current.version
  );
  const searcher = useAppSelector((state: RootState) => state.searcher.text);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchVerListAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVersion = (event: SelectChangeEvent<string>) => {
    dispatch(setVersion(event.target.value));
    dispatch(
      fetchChampListAsync({ version: event.target.value, language: "ko_KR" })
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box about="패치버전 선택영역" display="flex" justifyContent="center">
        <FormControl sx={{ m: 3, minWidth: 120 }} size="small">
          <InputLabel id="lol-version">롤 패치버전</InputLabel>
          <Select
            labelId="lol-version"
            value={version}
            onChange={handleVersion}
            variant="standard"
          >
            {verList.map((version: string) => (
              <MenuItem value={version} key={`ver-item-${version}`}>
                {version}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid
        container
        about="챔피언 리스트 영역"
        spacing={0.2}
        columns={{ xs: 3, sm: 5, md: 7 }}
      >
        {champList
          .filter((champ: ChampState) => champ.name.startsWith(searcher))
          .map((champ: ChampState) => (
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
              <Button onClick={() => navigate(`/champion/${champ.id}`)}>
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
