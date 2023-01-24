import { Box, Button, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Box width="100%">
        <Button variant="contained" href="/">
          Go to Home
        </Button>
      </Box>
      <Box
        height="100%"
        display="flex"
        paddingX="10%"
        flexDirection="column"
        alignItems="center"
      >
        <Outlet />
      </Box>
    </>
  );
}
