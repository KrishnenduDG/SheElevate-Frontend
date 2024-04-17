// CoverPicForm.jsx
import ImageUploadSingle from "@/components/shared/ImageUploadSingle.jsx";
import { Button, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CoverPicForm = ({
  handlePrevious,
  handleNext,
  formData,
  setFormData,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(formData.coverPic);
  }, []);

  useEffect(() => {
    console.log(image);
    setFormData({ ...formData, coverPic: image });
  }, [image]);

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
          console.log("Third form done");

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
              Cover Image:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ImageUploadSingle image={image} setImage={setImage} />
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

export default CoverPicForm;
