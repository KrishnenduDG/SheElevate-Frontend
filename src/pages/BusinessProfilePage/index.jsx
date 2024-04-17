import { useAuth } from "@/hooks/useAuth";
import { Avatar, Box, Button, Chip, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight, FaPhoneAlt, FaRegBuilding } from "react-icons/fa";

import { getRandomElementFromArray } from "@/utils";
import { MdOutlineContactPage, MdOutlineEmail } from "react-icons/md";

import { chipColorArray } from "@/constants";
import { businessService } from "@/services";
import { Img } from "react-image";
import { useNavigate, useParams } from "react-router-dom";

const BusinessProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { registeredEntity, isAuthLoading, googleUser } = useAuth();
  const [profileData, setProfileData] = useState(undefined);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const getBusinessProfileData = async (googleUser, username) => {
    const token = await googleUser.getIdToken();
    const { profile } = await businessService.getProfile(token, username);
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
      getBusinessProfileData(googleUser, username)
        .then((data) => setProfileData(data))
        .catch((error) => {
          navigate("/");
        });
    }
  }, [isAuthLoading]);

  useEffect(() => {
    if (profileData !== undefined) {
      setIsProfileLoading(false);
    }
  }, [profileData]);

  return (
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
                  src={profileData.profile_pic}
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
                  <FaRegBuilding size={30} color="white" />
                  <Typography
                    variant="subtitle1"
                    sx={{ ml: 1, color: "white", width: "80%" }}
                  >
                    {`Established at ${profileData.established_at}`}
                  </Typography>
                </Box>

                {/* categories */}
                <Box>
                  {profileData.categories.map((category) => (
                    <Tooltip title={category.desc}>
                      <Chip
                        label={category.name}
                        sx={{
                          background: getRandomElementFromArray(chipColorArray),
                          mr: 2,
                          mt: 2,
                          fontWeight: "bold",
                        }}
                      />
                    </Tooltip>
                  ))}
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
              {/* Cover Image */}
              <Box sx={{ height: "35%", width: "100%" }}>
                <Img
                  src={[profileData.cover_pic]}
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
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              {/* Product Images */}
              <Box sx={{ height: "56%", width: "100%", mt: 2, px: 1 }}>
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
                  {profileData.product_pics.slice(0, 2).map((image, index) => (
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
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessProfilePage;
