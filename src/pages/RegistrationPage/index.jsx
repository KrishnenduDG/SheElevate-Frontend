import { FcBusinesswoman } from "react-icons/fc";
import { IoBusinessOutline } from "react-icons/io5";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" gutterBottom color={"white"}>
        Register
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          marginBottom: 2,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IoBusinessOutline size={40} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Business Registration
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/business/register"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 0,
          }}
        >
          Register
        </Button>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FcBusinesswoman size={40} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            User Registration
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/user/register"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 0,
          }}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default RegistrationPage;
