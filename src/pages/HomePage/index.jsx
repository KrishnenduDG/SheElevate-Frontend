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

  return <div className="bg-green-500 text-white ">HomePage</div>;
};

export default HomePage;
