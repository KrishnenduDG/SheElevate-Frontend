import { useAuth } from "@/hooks/useAuth";
import { misclService, userService } from "@/services";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicDetailsForm from "./BasicDetailsForm";
import ShowcaseImagesForm from "./ShowcaseImagesForm";

const UserRegistrationForm = () => {
  const navigate = useNavigate();
  const { googleUser, handleUserReg } = useAuth();
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    bio: "",
    showcasePics: [],
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  const handlePrevious = () => {
    setPhase((prevPhase) => prevPhase - 1);
  };

  const handleSubmit = async () => {
    const token = await googleUser.getIdToken();

    const reqPayload = {};
    reqPayload["username"] = formData.username;
    reqPayload["phone"] = formData.phone;
    reqPayload["address"] = formData.address;
    reqPayload["bio"] = formData.bio;

    // Uploading the Product Pics
    const showcasePicsUploadRes = await Promise.all(
      formData.showcasePics.map(async (showcasePic) => {
        const uploadRes = await misclService.cloudinaryUpload(showcasePic);
        return uploadRes.secure_url;
      })
    );
    reqPayload["showcasePics"] = showcasePicsUploadRes;

    await handleUserReg(reqPayload);
  };

  return (
    <div style={{ background: "#1A1A2E", width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h4" color="white">
          User Registration
        </Typography>
      </Box>
      {phase === 1 && (
        <BasicDetailsForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          handleNext={handleNext}
        />
      )}
      {phase === 2 && (
        <ShowcaseImagesForm
          formData={formData}
          setFormData={setFormData}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UserRegistrationForm;
