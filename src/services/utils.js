import { baseUrl } from "@/constants";
import { checkRegistrationStatus, getAllCategoriesURL } from "@/services/urls";
import axios from "axios";

export class UtilsService {
  constructor() {}

  getRegistrationStatus = async (token) =>
    await (
      await axios.get(`${baseUrl}/${checkRegistrationStatus}`, {
        headers: { "x-firebase-token": token },
      })
    ).data;

  getAllCategories = async () =>
    await (
      await axios.get(`${baseUrl}/${getAllCategoriesURL}`)
    ).data;
}
