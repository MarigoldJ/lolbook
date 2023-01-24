import { Button, Stack } from "@mui/material";
import { urlRouter } from "./routes";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">밴픽하기</Button>
        <Button variant="contained" href={urlRouter("champion")}>
          챔피언 정보 보기
        </Button>
      </Stack>
    </>
  );
}
