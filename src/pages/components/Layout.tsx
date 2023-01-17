import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box height="100vh" display="flex">
      <CssBaseline />
      <Outlet />
    </Box>
  );
}
