import { Navbar } from "@/components/";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Box
        sx={{
          height: "10%",
          width: "100vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Navbar />
      </Box>

      <Box
        sx={{
          height: "90%",
          width: "100vw",
          background: "#1A1A2E",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MasterLayout;
