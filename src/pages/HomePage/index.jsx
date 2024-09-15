import { userLabel } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

const HomePage = () => {
  const { isAuthLoading, registeredEntity } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;

    registeredEntity &&
      (registeredEntity.type === userLabel
        ? navigate(`/user/${registeredEntity.profile.username}`)
        : navigate("/business"));
  }, [isAuthLoading]);

  return (
    <div>
      <div className="flex py-6">
        <h1 className=" text-white font-serif text-3xl mt-0 z-1 leading leading-relaxed text-center capitalize py-5 text-wrap">
          Each time a woman stands up for herself,
          <br /> without knowing it possibly,
          <br /> without claiming it,
          <br />
          she stands up for all women.
          <br />
          <h2 className="text-2xl"> -Maya Angelou</h2>
        </h1>
      </div>
      <div className="flex justify-center items-center gap-2">
        <p className="text-2xl text-white">A platform to </p>
        <ReactTyped
          strings={[
            "Showcase your art ...",
            "Connect to investors...",
            "uphold craftsmenship...",
          ]}
          typeSpeed={40}
          backSpeed={50}
          loop
          className="text-2xl font-bold text-[#99ddff]"
        />
      </div>
      <div className="bg-white">
        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block width: calc(130% + 1.3px); height: 223px"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
