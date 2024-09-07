import { Navbar } from "@/components/";
//import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <div
      className="h-screen w-screen overflow-hidden"
      // sx={{ height: "100px", width: "100vw", overflow: "hidden" }}
    >
      <div
        className="bg-yellow-300 h-[10vh] w-[100vw] flex items-center"
        // sx={{
        //   height: "10%",
        //   width: "100vw",
        //   display: "flex",
        //   alignItems: "center",
        // }}
      >
        <Navbar />
      </div>

      <div
        className=" bg-gradient-to-r from-violet-950 to-black h-[90vh] w-[100vw]"
        // sx={{
        //   height: "90%",
        //   width: "100vw",
        //   background: "green",
        // }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MasterLayout;
