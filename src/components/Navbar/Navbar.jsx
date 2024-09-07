import { GoogleSignInButton } from "@/components/shared";
import { useAuth } from "@/hooks/useAuth";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarProfile from "./NavbarProfile";

const Navbar = () => {
  const {
    handleGoogleSignIn,
    isAuthLoading,
    googleUser,
    registeredUser,
    error,
  } = useAuth();

  return (
    <div
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        position="static"
        sx={{
          p: 1.0,
          background: "#0c0526",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width="100%"
        >
          <div
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Link to="/" style={{ all: "unset" }}>
              SheElevate
            </Link>
          </div>

          {!isAuthLoading ? (
            !googleUser ? (
              <GoogleSignInButton onClick={handleGoogleSignIn} />
            ) : (
              <NavbarProfile />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
