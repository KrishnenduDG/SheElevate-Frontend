import { Button, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = ({ onClick }) => {
  return (
    <Button
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        color: "#757575",
        borderRadius: "4px",
        boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
        height: "36px",
        padding: "0 16px",
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s",
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      }}
      onClick={onClick}
    >
      <FcGoogle size={22} style={{ marginRight: 8 }} />
      <Typography fontWeight="bolder" textTransform={"none"}>
        Login
      </Typography>
    </Button>
  );
};

export default GoogleSignInButton;
