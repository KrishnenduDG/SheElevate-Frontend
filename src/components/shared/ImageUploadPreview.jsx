import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

function ImageUploadComponent({ images, setImages }) {
  const handleImageUpload = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  return (
    <Box>
      <label htmlFor="fileInput">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <IconButton
          component="span"
          sx={{
            borderRadius: "3px",
            backgroundColor: "#3f51b5",
            color: "#fff",
            marginRight: "8px",
            padding: "8px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          <FaCloudUploadAlt />
        </IconButton>
      </label>

      {/* Preview */}
      <Box
        sx={{
          marginTop: 3,
          height: "60vh",
          width: "60vw",
          background: "#f5f5f5",
          display: "flex",
          marginLeft: 1,
          flexWrap: "wrap",
          overflow: "auto", // Add this line for scrollability
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              position: "relative", // Add position relative to position close button
              height: "50%",
              width: "30%",
              marginRight: 2,
              marginLeft: 2,
              marginTop: 1,
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                color: "white",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              <IoIosCloseCircleOutline color="red" />
            </IconButton>
            <img
              src={URL.createObjectURL(img)}
              style={{ width: "100%", height: "100%" }}
              alt={`Image ${index}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ImageUploadComponent;
