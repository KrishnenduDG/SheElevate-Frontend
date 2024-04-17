import { businessLabel, userLabel } from "@/constants";
import { GAuthProvider, auth } from "@/firebase";
import { businessService, userService, utilsService } from "@/services";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [googleUser, setGoogleUser] = useState(undefined);
  const [registeredEntity, setRegisteredEntity] = useState(undefined);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    const signInRes = await signInWithPopup(auth, GAuthProvider);

    signInRes && setGoogleUser(signInRes.user);
  };

  const handleSignOut = async () => {
    setRegisteredEntity(null);
    await signOut(auth);
    navigate("/");
  };

  const handleUserReg = async (reqPayload) => {
    const token = await googleUser.getIdToken();
    try {
      const regRes = await userService.register(token, reqPayload);
      setRegisteredEntity(regRes.user);
      return navigate(`/user/${regRes.user.username}`);
    } catch (error) {
      console.log(error);
      alert("Some error");
    }
  };

  const handleBusinessReg = async (reqPayload) => {
    const token = await googleUser.getIdToken();

    try {
      const regRes = await businessService.register(token, reqPayload);
      setRegisteredEntity(regRes.business);
      return navigate(`/business/${regRes.business.username}`);
    } catch (error) {
      alert("Some error");
    }
  };

  const checkregisteredEntityOrNot = async () => {
    try {
      const { status, msg, type, profile } =
        await utilsService.getRegistrationStatus(await googleUser.getIdToken());

      if (type === userLabel) {
        try {
          const userProfile = await userService.getProfile(
            await googleUser.getIdToken(),
            profile.username
          );

          setRegisteredEntity({
            profile: userProfile.profile,
            type: userLabel,
          });
        } catch (error) {
          setRegisteredEntity(null);
          if (error.response.status === 500)
            setError("Internal Server Error while fetching User Profile");
        }
      } else {
        try {
          const businessProfile = await businessService.getProfile(
            await googleUser.getIdToken(),
            profile.username
          );

          setRegisteredEntity({
            profile: businessProfile.profile,
            type: businessLabel,
          });
        } catch (error) {
          setRegisteredEntity(null);
          if (error.response.status === 500)
            setError("Internal Server Error while fetching Business Profile");
        }
      }
    } catch (error) {
      switch (error.response.status) {
        case 403: {
          // Not registered
          setRegisteredEntity(null);
        }

        case 500: {
          // INTERNAL SERVER ERROR
          setRegisteredEntity(null);
          setError("Internal server error");
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setGoogleUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (googleUser === undefined) return;

    if (googleUser === null) setIsAuthLoading(false);

    checkregisteredEntityOrNot();
  }, [googleUser]);

  useEffect(() => {
    if (registeredEntity === undefined) return;

    console.log(registeredEntity);
    setIsAuthLoading(false);
    if (registeredEntity === null) navigate("/register");
  }, [registeredEntity]);

  const value = {
    handleGoogleSignIn,
    isAuthLoading,
    googleUser,
    registeredEntity,
    error,
    handleSignOut,
    handleUserReg,
    handleBusinessReg,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
