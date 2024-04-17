import CategorySelector from "@/components/shared/CategorySelector";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CategoryForm = ({
  formData,
  setFormData,
  handlePrevious,
  handleSubmit,
  categories,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setFormData((prevData) => {
      return { ...prevData, categories: selectedCategories };
    });
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
          handleSubmit();
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
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <Box
            sx={{
              width: "50%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
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
              Submit
            </Button>
          </Box>
        </Box>
      </motion.form>
    </Grid>
  );
};

export default CategoryForm;
