import { Box, IconButton } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageUploadSingleComponent({ image, setImage }) {
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Box>
      <label htmlFor="fileInput">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
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
          height: "50vh",
          width: "40vw",
          background: "#f5f5f5",
          display: "flex",
          marginLeft: 1,
          flexWrap: "wrap",
          overflow: "auto", // Add this line for scrollability
        }}
      >
        {image && image !== "" && (
          <img
            src={URL.createObjectURL(image)}
            style={{ width: "100%", height: "100%" }}
            alt="Uploaded Image"
          />
        )}
      </Box>
    </Box>
  );
}

export default ImageUploadSingleComponent;
