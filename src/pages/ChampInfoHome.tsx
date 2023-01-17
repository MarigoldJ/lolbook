import { Typography } from "@mui/material";
import ChampList from "../features/ChampList";
import Searcher from "../features/Searcher";

export default function ChampInfoHome() {
  return (
    <>
      <Typography variant="h1" fontSize={50}>
        Search Champions
      </Typography>
      <Searcher />
      <ChampList />
    </>
  );
}
