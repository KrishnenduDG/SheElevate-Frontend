import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const CategorySelector = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [customCategory, setCustomCategory] = useState({
    name: "",
    desc: "",
  });

  const handleAddCustomCategory = () => {
    if (customCategory.name && customCategory.desc) {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        customCategory,
      ]);
      setCustomCategory({ name: "", desc: "" });
    }
  };

  const handleDeleteCategory = (index) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((_, i) => i !== index)
    );
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: "#1A1A2E",
        color: "#FFFFFF",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        width: "50%",
        margin: "auto",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Select Categories:</Typography>
        <Autocomplete
          multiple
          options={categories}
          value={selectedCategories}
          onChange={(_, value) => setSelectedCategories(value)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                width: "30vw",
                "& .MuiInputBase-root": {
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  background: "#2A2A3E",
                },
                "& .MuiAutocomplete-tag": {
                  marginRight: "4px",
                  marginBottom: "4px",
                  textTransform: "none",
                  height: "32px",
                  borderRadius: "10px",
                  color: "white",
                  border: "1px solid #FFFFFF",
                },
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Button
                key={index}
                variant="outlined"
                style={{
                  marginRight: "4px",
                  marginBottom: "4px",
                  textTransform: "none",
                  height: "32px",
                }}
                {...getTagProps({ index })}
              >
                {option.name}
                <IconButton
                  size="small"
                  style={{ marginLeft: "4px", padding: "4px" }}
                  onClick={() => handleDeleteCategory(index)}
                >
                  <RiCloseCircleLine color="red" />
                </IconButton>
              </Button>
            ))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Add Custom Category:
        </Typography>

        <TextField
          sx={{ mb: 3 }}
          name="categories"
          label="Category Name"
          value={customCategory.name}
          onChange={(e) =>
            setCustomCategory({ ...customCategory, name: e.target.value })
          }
          fullWidth
          size="small"
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

        <TextField
          sx={{ mb: 3 }}
          name="categories"
          label="Category Description"
          value={customCategory.desc}
          onChange={(e) =>
            setCustomCategory({
              ...customCategory,
              desc: e.target.value,
            })
          }
          fullWidth
          size="small"
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

        <Button
          variant="contained"
          onClick={handleAddCustomCategory}
          size="small"
          sx={{ marginTop: "10px" }}
        >
          Add Custom Category
        </Button>
      </Grid>
    </Grid>
  );
};

export default CategorySelector;
