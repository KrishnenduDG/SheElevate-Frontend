import { Navbar } from "@/components/";
//import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <div>
      <div
        className="bg-yellow-300 h-20 flex items-center"
        // sx={{
        //   height: "10%",
        //   width: "100vw",
        //   display: "flex",
        //   alignItems: "center",
        // }}
      >
        <Navbar />
      </div>

      <Outlet />
    </div>
  );
};

export default MasterLayout;
