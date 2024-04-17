// ShopForm.jsx
import { useAuth } from "@/hooks/useAuth";
import { businessService, misclService, utilsService } from "@/services";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicDetailsForm from "./BasicDetailsForm";
import CategoryForm from "./CategoryForm";
import CoverPicForm from "./CoverPicForm";
import OtherDetailsForm from "./OtherDetailsForm";
import ProductImagesForm from "./ProductImagesForm";

const BusinessRegistrationForm = () => {
  const navigate = useNavigate();
  const { googleUser, handleBusinessReg } = useAuth();
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    bio: "",
    estdAt: "",
    categories: [],
    coverPic: "",
    productPics: [],
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  useEffect(() => {
    utilsService.getAllCategories().then((data) => {
      setCategories(data.categories);
    });
  }, []);

  useEffect(() => {
    setIsCategoryLoading(false);
  }, [categories]);
  const handleNext = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  const handlePrevious = () => {
    setPhase((prevPhase) => prevPhase - 1);
  };

  const handleSubmit = async () => {
    console.log("Hit handle submit");
    const reqPayload = {};
    reqPayload["username"] = formData.username;
    reqPayload["phone"] = formData.phone;
    reqPayload["address"] = [formData.address];
    reqPayload["bio"] = formData.bio;
    reqPayload["estdAt"] = formData.estdAt;
    reqPayload["categories"] = formData.categories;

    // Uploading the Cover Pic
    const coverPicuploadRes = await misclService.cloudinaryUpload(
      formData.coverPic
    );
    reqPayload["coverPic"] = coverPicuploadRes.secure_url;

    // Uploading the Product Pics
    const productPicUploadRes = await Promise.all(
      formData.productPics.map(async (productPic) => {
        const uploadRes = await misclService.cloudinaryUpload(productPic);
        return uploadRes.secure_url;
      })
    );

    reqPayload["productPics"] = productPicUploadRes;

    await handleBusinessReg(reqPayload);
  };

  return (
    !isCategoryLoading && (
      <div style={{ background: "#1A1A2E", width: "100%", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="h4" color="white">
            Business Registration
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
          <ProductImagesForm
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        )}
        {phase === 3 && (
          <CoverPicForm
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        )}
        {phase === 4 && (
          <OtherDetailsForm
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        )}
        {phase === 5 && (
          <CategoryForm
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
            categories={categories}
          />
        )}
      </div>
    )
  );
};

export default BusinessRegistrationForm;
