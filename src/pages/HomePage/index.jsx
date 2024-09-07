import { userLabel } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  );
};

export default HomePage;
