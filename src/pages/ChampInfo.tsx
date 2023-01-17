import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ChampInfo() {
  const { champId } = useParams();
  return <Box>{champId}</Box>;
}
