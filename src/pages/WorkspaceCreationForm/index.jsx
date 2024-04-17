// ShopForm.jsx
import { useAuth } from "@/hooks/useAuth";
import { misclService, userService, utilsService } from "@/services";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicDetailsForm from "./BasicDetailsForm";
import CategoryForm from "./CategoryForm";
import CoverPicForm from "./CoverPicForm";
import ProductImagesForm from "./ProductImagesForm";

const WorkspaceCreationForm = () => {
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    categories: [],
    coverPic: "",
    productPics: [],
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  const { registeredEntity, googleUser } = useAuth();
  const navigate = useNavigate();
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
    const reqPayload = {};

    reqPayload["name"] = formData.name;
    reqPayload["desc"] = formData.desc;
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

    const token = await googleUser.getIdToken();

    try {
      const regRes = await userService.createWorkspace(token, reqPayload);
      console.log(regRes);
      return navigate(`/user/${registeredEntity.profile.username}`);
    } catch (error) {
      alert("Some error");
    }
  };

  return (
    !isCategoryLoading && (
      <div style={{ background: "#1A1A2E", width: "100%", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="h4" color="white">
            Create a Workspace
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

export default WorkspaceCreationForm;
