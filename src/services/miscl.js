import { cloudinaryUploadPreset } from "@/constants";
import axios from "axios";
import { cloudinaryUploadURL } from "./urls";

export class MisclService {
  constructor() {}

  cloudinaryUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);

    return await (
      await axios.post(cloudinaryUploadURL, formData)
    ).data;
  };
}
