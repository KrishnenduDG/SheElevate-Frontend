// ProductImagesForm.jsx
import ImageUploadPreview from "@/components/shared/ImageUploadPreview";
import { Button, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const ProductImagesForm = ({
  handlePrevious,
  handleNext,
  formData,
  setFormData,
}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(formData.productPics);
  }, []);

  useEffect(() => {
    setFormData((prevData) => {
      return { ...prevData, productPics: images };
    });
  }, [images]);

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
          console.log("second form done");

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
            <Typography variant="h6" sx={{ color: "#CCCCCC" }}>
              Product Images:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ImageUploadPreview images={images} setImages={setImages} />
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

export default ProductImagesForm;
