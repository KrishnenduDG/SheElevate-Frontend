import { useAuth } from "@/hooks/useAuth";
import { workspaceService } from "@/services";
import { getRandomElementFromArray } from "@/utils/index";
import { Avatar, Box, Button, Chip, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

import { chipColorArray } from "@/constants";
import { Img } from "react-image";
import { Link, useNavigate, useParams } from "react-router-dom";

const WorkspaceDetailsPage = () => {
  const { username, workspaceName } = useParams();
  const { googleUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) return;

    const getWorkspaceData = async () => {
      const token = await googleUser.getIdToken();

      try {
        const workspaceData = await workspaceService.getWorkspaceDetails(
          token,
          username,
          workspaceName
        );

        setWorkspace(workspaceData.workspace);
      } catch (error) {
        navigate("/");
      }
    };

    getWorkspaceData();
  }, [isAuthLoading]);

  useEffect(() => {
    if (!workspace) return;

    console.log(workspace);
    setIsWorkspaceLoading(false);
  }, [workspace]);

  return isWorkspaceLoading ? (
    <></>
  ) : (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      {/* Left Panel */}
      <Box sx={{ height: "100%", width: "60%", p: 1.5, marginRight: 4 }}>
        {/* Name of Workspace */}
        <Box display={"flex"} sx={{ alignItems: "center" }}>
          <Link
            to={`/user/${workspace.user.username}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h4"
              color={"white"}
              sx={{
                mr: 1,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >{`${workspace.user.username}`}</Typography>
          </Link>
          <Typography
            variant="h4"
            color={"white"}
          >{`/ ${workspace.name}`}</Typography>
        </Box>

        {/* Cover Image */}
        <Box sx={{ width: "100%", height: "30%" }}>
          <Img
            src={[workspace.coverPic]}
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

        {/* Display Images section */}
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
            {workspace.productPics.slice(0, 2).map((image, index) => (
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
      </Box>

      {/* Right Panel */}
      <Box sx={{ height: "100%", width: "35%", p: 1.5 }}>
        {/* Description Section */}
        <Box sx={{ width: "100%", height: "40%" }}>
          <Typography color={"white"} variant="h5">
            Description
          </Typography>
          <Typography
            color={"#B0B0B0"}
            sx={{
              width: "100%",
              height: "50%",
              overflowWrap: "break-word",
              // whiteSpace: "normal",
              // overflow: "hidden",
            }}
          >
            {workspace.description}
          </Typography>
        </Box>

        {/* Category Section */}
        <Box sx={{ width: "100%", height: "40%" }}>
          <Typography color={"white"} variant="h5">
            Categories
          </Typography>

          <Box>
            {workspace.categories.map((category) => (
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
      </Box>
    </Box>
  );
};

export default WorkspaceDetailsPage;
