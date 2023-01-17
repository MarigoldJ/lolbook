import { Typography } from "@mui/material";
import Searcher from "../features/Searcher";

export default function ChampInfoHome() {
  return (
    <>
      <Typography variant="h1" fontSize={50}>
        Search Champions
      </Typography>
      <Searcher />
    </>
  );
}
