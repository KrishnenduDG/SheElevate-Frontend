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
    <div className="h-full w-full flex bg-[#0c0526]">
      {/* Container for SheElevate */}
      <div className="flex flex-row justify-between w-full items-center">
        {/* SheElevate on the left */}
        <div className="font-mono font-bold tracking-widest text-white">
          <Link to="/" className="text-inherit no-underline">
            SheElevate
          </Link>
        </div>

        {/* Navigation links on the right */}
        {/* <ul className="flex flex-row gap-8 items-center text-white">
          <li className="hidden sm:inline p-5 mr-4 hover:bg-[#99ddff] hover:text-black font-semibold">
            <a href="#">Home</a>
          </li>
          <li className="hidden sm:inline p-5 mr-4 hover:bg-[#99ddff] hover:text-black font-semibold">
            <a href="#Details">About</a>
          </li>
          <li className="hidden sm:inline p-5 mr-4 hover:bg-[#99ddff] hover:text-black font-semibold">
            <a href="#contact">Contact Us</a>
          </li> */}
        <ul className="flex flex-row gap-8 items-center text-white">
          <li className="hidden sm:inline p-5 mr-4 hover:bg-[#99ddff] hover:text-black font-semibold">
            <Link to="/home" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li className="hidden sm:inline p-5 mr-4 hover:bg-[#99ddff] hover:text-black font-semibold">
            <Link to="/details" smooth={true} duration={500}>
              About
            </Link>
          </li>
          <li className="hidden sm:inline p-5 mr-4 hover:bg-[#99ddff] hover:text-black font-semibold">
            <Link to="/contact" smooth={true} duration={500}>
              Contact Us
            </Link>
          </li>

          {/* Google Sign In Button */}
          {!isAuthLoading ? (
            !googleUser ? (
              <GoogleSignInButton onClick={handleGoogleSignIn} />
            ) : (
              <NavbarProfile />
            )
          ) : null}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
