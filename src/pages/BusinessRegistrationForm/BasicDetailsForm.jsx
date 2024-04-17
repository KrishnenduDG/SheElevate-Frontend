// BasicDetailsForm.jsx
import { Button, Grid, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const BasicDetailsForm = ({ formData, setFormData, errors, handleNext }) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("First form done");
          handleNext();
        }}
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.5 }}
        sx={{
          background: "#1A1A2E",
          color: "#FFFFFF",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          width: "50%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ color: "#CCCCCC", marginBottom: "10px" }}
            >
              Basic Details:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              fullWidth
              size="small"
              required
              error={errors.username}
              helperText={errors.username && "Username is required"}
              InputLabelProps={{
                style: { color: "#FFFFFF", fontWeight: "bold" },
              }}
              InputProps={{
                style: {
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  background: "#2A2A3E",
                  padding: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              fullWidth
              size="small"
              required
              error={errors.phone}
              helperText={errors.phone && "Phone is required"}
              InputLabelProps={{
                style: { color: "#FFFFFF", fontWeight: "bold" },
              }}
              InputProps={{
                style: {
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  background: "#2A2A3E",
                  padding: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="success"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </motion.form>
    </Grid>
  );
};

export default BasicDetailsForm;
