import { baseUrl } from "@/constants";
import axios from "axios";
import { getBusinessProfile, registerBusinessURL } from "./urls";

export class BusinessService {
  constructor() {}

  getProfile = async (token, username) =>
    await (
      await axios.get(`${baseUrl}/${getBusinessProfile}/${username}`, {
        headers: { "x-firebase-token": token },
      })
    ).data;

  register = async (token, payload) =>
    await (
      await axios.post(`${baseUrl}/${registerBusinessURL}`, payload, {
        headers: { "x-firebase-token": token },
      })
    ).data;
}
