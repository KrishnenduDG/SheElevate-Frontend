import { useAuth } from "@/hooks/useAuth";
import { userService, workspaceService } from "@/services";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FaLongArrowAltRight,
  FaPhoneAlt,
  FaPlus,
  FaRegBuilding,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineContactPage, MdOutlineEmail } from "react-icons/md";
import { Img } from "react-image";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { registeredEntity, isAuthLoading, googleUser } = useAuth();

  const { username } = useParams();
  const navigate = useNavigate();

  const [isWorkspacesLoading, setIsWorkspacesLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState(null);

  const [profileData, setProfileData] = useState(undefined);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const getUserprofileData = async (googleUser, username) => {
    const token = await googleUser.getIdToken();
    const { profile } = await userService.getProfile(token, username);
    return profile;
  };

  useEffect(() => {
    if (isAuthLoading) return;

    if (
      registeredEntity &&
      registeredEntity.profile &&
      registeredEntity.profile.username === username
    ) {
      setProfileData(registeredEntity.profile);
    } else {
      getUserprofileData(googleUser, username)
        .then((data) => setProfileData(data))
        .catch((error) => {
          navigate("/");
        });
    }
  }, [isAuthLoading]);

  useEffect(() => {
    const getWorkspaces = async () => {
      const token = await googleUser.getIdToken();
      const workspaceRes = await workspaceService.getAllWorkspacesForUser(
        token
      );

      console.log(workspaceRes.workspaces);
      setWorkspaces(workspaceRes.workspaces);
    };

    getWorkspaces();
  }, [profileData]);

  useEffect(() => {
    if (workspaces) setIsWorkspacesLoading(false);
  }, [workspaces]);

  useEffect(() => {
    if (profileData !== undefined) {
      console.log(profileData);
      setIsProfileLoading(false);
    }
  }, [profileData]);

  return (
    <></> && (
      <Box
        sx={{
          background: "#1A1A2E",
          height: "100%",
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              width: "30%",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!isProfileLoading ? (
              <>
                {/* Image */}
                <Box display={"flex"} justifyContent={"center"} mb={1}>
                  <Avatar
                    alt={profileData.username}
                    src={profileData.profilePic}
                    sx={{ width: "100px", height: "100px" }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" color="white">
                    {profileData.name}
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle1" color="#B0B0B0">
                    @{profileData.username}
                  </Typography>
                </Box>
                {/* Details */}
                <Box pl={"10%"}>
                  {/* Email */}
                  <Box display={"flex"} alignItems={"center"} mb={3}>
                    <MdOutlineEmail size={35} color="white" />
                    <Typography
                      variant="subtitle1"
                      sx={{ ml: 1, color: "white", width: "80%" }}
                    >
                      {profileData.email}
                    </Typography>
                  </Box>

                  {/* Bio */}
                  <Box display={"flex"} alignItems={"start"} mb={3}>
                    <MdOutlineContactPage size={35} color="white" />
                    <Typography
                      variant="subtitle1"
                      sx={{ ml: 1, color: "white", width: "80%" }}
                    >
                      {`${profileData.bio}`}
                    </Typography>
                  </Box>

                  {/* Contact Number */}
                  <Box display={"flex"} alignItems={"start"} mb={3}>
                    <FaPhoneAlt size={30} color="white" />
                    <Typography
                      variant="subtitle1"
                      sx={{ ml: 1, color: "white", width: "80%" }}
                    >
                      {`${profileData.phoneNumber}`}
                    </Typography>
                  </Box>

                  {/* Established At */}
                  <Box display={"flex"} alignItems={"start"} mb={3}>
                    <IoLocationSharp size={30} color="white" />
                    <Typography
                      variant="subtitle1"
                      sx={{ ml: 1, color: "white", width: "80%" }}
                    >
                      {`${profileData.address}`}
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : null}
          </Box>

          {/* Right Panel */}
          <Box sx={{ height: "100%", width: "70%" }}>
            {!isProfileLoading && (
              <>
                {" "}
                {/* Product Images */}
                <Box sx={{ height: "48%", width: "100%", mt: 2, mb: 4, px: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{ color: "#FAFAFA", fontWeight: "bold", mb: 1 }}
                  >
                    Discover Our Products
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      mt: 2,
                      mr: 3,
                      justifyContent: "space-between",
                      height: "75%",
                    }}
                  >
                    {profileData.showcasePics
                      .slice(0, 2)
                      .map((image, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: "calc(40% - 10px)",
                            height: "100%",
                            margin: "5px",
                            borderRadius: "10px",
                          }}
                        >
                          <Img
                            src={[image]}
                            unloader={
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "#f2f2f2",
                                  color: "#555",
                                  fontSize: "18px",
                                  fontFamily: "Arial, sans-serif",
                                  fontWeight: "bold",
                                  textShadow: "1px 1px 1px #ccc",
                                  boxShadow: "2px 2px 5px #ccc",
                                }}
                              >
                                &#9888; Sorry, could not load image &#128532;
                              </div>
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                            }}
                          />
                        </Box>
                      ))}
                  </Box>

                  {/* Explore More Button */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 3,
                      mr: 3,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      sx={{
                        borderRadius: "50px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                        textTransform: "none",
                        fontWeight: "bolder",
                        display: "flex",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      Explore More Products
                      <FaLongArrowAltRight style={{ marginLeft: 4 }} />
                    </Button>
                  </Box>
                </Box>
                {/* Workspaces */}
                <Box sx={{ height: "48%", width: "100%", mt: 2, px: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{ color: "#FAFAFA", fontWeight: "bold", mb: 1 }}
                  >
                    Workspaces
                  </Typography>

                  {isWorkspacesLoading ? (
                    <></>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {workspaces.length === 0 ? (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            color={"#B0B0B0"}
                            sx={{ marginBottom: 1 }}
                          >
                            No Workspace Found
                          </Typography>

                          <Button
                            color="warning"
                            variant="contained"
                            onClick={() => navigate("/workspace/create")}
                            startIcon={<FaPlus color="white" />}
                            sx={{
                              borderRadius: "50px",
                              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                              textTransform: "none",
                              fontWeight: "bolder",
                              display: "flex",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            Create a Workspace
                          </Button>
                        </Box>
                      ) : (
                        workspaces.map((ws) => (
                          <Link
                            to={`/workspace/${username}/${ws.name}`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            <Box
                              sx={{
                                height: "30%",
                                width: "40%",
                                background: "#13131d",
                                borderRadius: "10px",
                                marginRight: 3,
                                display: "flex",
                              }}
                            >
                              {/* Image */}
                              <Box sx={{ width: "30%", height: "100%" }}>
                                <Img
                                  src={ws.coverPic}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderTopLeftRadius: "10px",
                                    borderBottomLeftRadius: "10px",
                                  }}
                                />
                              </Box>

                              {/* Content Panel */}
                              <Box
                                sx={{
                                  p: 2,
                                  width: "70%",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography
                                  variant="subtitle-1"
                                  fontWeight={"bolder"}
                                >
                                  {ws.name}
                                </Typography>

                                <Typography
                                  variant="subtitle-1"
                                  sx={{
                                    width: "70%",
                                    height: "60%",
                                    whiteSpace: "normal",
                                    overflow: "ellipsis",
                                  }}
                                >
                                  {ws.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Link>
                        ))
                      )}
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};

export default UserProfilePage;
