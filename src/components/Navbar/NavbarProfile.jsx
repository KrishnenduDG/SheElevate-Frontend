import { userLabel } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarProfile = () => {
  const navigate = useNavigate();
  const {
    handleGoogleSignIn,
    isAuthLoading,
    googleUser,
    registeredEntity,
    handleSignOut,
    error,
  } = useAuth();

  const [menuAnchor, setMenuAnchor] = useState(null);

  //     <Box sx={{ flexGrow: 0 }}>
  //       <IconButton sx={{ p: 0 }} onClick={(e) => setMenuAnchor(e.currentTarget)}>
  //         <Avatar alt={googleUser.displayName} src={googleUser.photoURL} />
  //       </IconButton>

  //       <Menu
  //         sx={{ mt: "45px" }}
  //         id="menu-appbar"
  //         anchorEl={menuAnchor}
  //         anchorOrigin={{
  //           vertical: "top",
  //           horizontal: "right",
  //         }}
  //         keepMounted
  //         transformOrigin={{
  //           vertical: "top",
  //           horizontal: "right",
  //         }}
  //         open={Boolean(menuAnchor)}
  //         onClose={() => setMenuAnchor(null)}
  //       >
  //         {registeredEntity && (
  //           <MenuItem
  //             key={"Profile"}
  //             onClick={() => {
  //               setMenuAnchor(null);
  //               navigate(
  //                 `${registeredEntity.type}/${registeredEntity.profile.username}`
  //               );
  //             }}
  //           >
  //             <Typography textAlign="center">Profile</Typography>
  //           </MenuItem>
  //         )}

  //         {registeredEntity && registeredEntity.type === userLabel && (
  //           <MenuItem
  //             key={"New Workspace"}
  //             onClick={() => {
  //               setMenuAnchor(null);
  //               navigate(`/workspace/create`);
  //             }}
  //           >
  //             <Typography textAlign="center">Create Workspace</Typography>
  //           </MenuItem>
  //         )}

  //         <MenuItem key={"Sign Out"} onClick={handleSignOut}>
  //           <Typography textAlign="center">Sign Out</Typography>
  //         </MenuItem>
  //       </Menu>
  //     </Box>
  //   );
  // };
  return (
    <div class="flex-grow-0">
      <button class="p-0" onClick={(e) => setMenuAnchor(e.currentTarget)}>
        <img
          class="w-10 h-10 rounded-full"
          alt={googleUser.displayName}
          src={googleUser.photoURL}
        />
      </button>

      <div
        className={`mt-11 ${
          menuAnchor ? "block" : "hidden"
        } absolute top-12 right-0 bg-white shadow-lg rounded-md`}
        id="menu-appbar"
        onMouseLeave={() => setMenuAnchor(null)}
      >
        {registeredEntity && (
          <div
            class="py-2 px-4 cursor-pointer hover:bg-gray-200"
            key={"Profile"}
            onClick={() => {
              setMenuAnchor(null);
              navigate(
                `${registeredEntity.type}/${registeredEntity.profile.username}`
              );
            }}
          >
            <span class="text-center block">Profile</span>
          </div>
        )}

        {registeredEntity && registeredEntity.type === userLabel && (
          <div
            class="py-2 px-4 cursor-pointer hover:bg-gray-200"
            key={"New Workspace"}
            onClick={() => {
              setMenuAnchor(null);
              navigate(`/workspace/create`);
            }}
          >
            <span class="text-center block">Create Workspace</span>
          </div>
        )}

        <div
          class="py-2 px-4 cursor-pointer hover:bg-gray-200"
          key={"Sign Out"}
          onClick={handleSignOut}
        >
          <span class="text-center block">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarProfile;
