import CategorySelector from "@/components/shared/CategorySelector";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const OtherDetailsForm = ({
  formData,
  setFormData,
  handlePrevious,
  handleNext,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setFormData((prevData) => {
      return { ...prevData, categories: selectedCategories };
    });

    console.log(selectedCategories);
  }, [selectedCategories]);

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
          console.log("Fourth form done");

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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ color: "#CCCCCC", marginBottom: "10px" }}
            >
              Other Details:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              fullWidth
              size="small"
              required
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
          <Grid item xs={6}>
            <TextField
              name="estdAt"
              label="Established At"
              type="text"
              value={formData.estdAt}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setFormData({ ...formData, estdAt: e.target.value });
                }
              }}
              fullWidth
              size="small"
              required
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
                inputProps: {
                  pattern: "[0-9]*",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="bio"
              label="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              fullWidth
              multiline
              rows={4}
              required
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
              onClick={handlePrevious}
              variant="contained"
              size="small"
              color="warning"
              sx={{ marginRight: 4 }}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
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

export default OtherDetailsForm;
