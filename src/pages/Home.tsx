import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">밴픽하기</Button>
        <Button variant="contained" onClick={() => navigate("/champion")}>
          챔피언 정보 보기
        </Button>
      </Stack>
    </>
  );
}
