import { baseUrl } from "@/constants";
import {
  createWorkspaceURL,
  getUserProfile,
  registerUserURL,
} from "@/services/urls";
import axios from "axios";

export class UserService {
  constructor() {}

  getProfile = async (token, username) =>
    await (
      await axios.get(`${baseUrl}/${getUserProfile}/${username}`, {
        headers: { "x-firebase-token": token },
      })
    ).data;

  register = async (token, payload) =>
    await (
      await axios.post(`${baseUrl}/${registerUserURL}`, payload, {
        headers: { "x-firebase-token": token },
      })
    ).data;

  createWorkspace = async (token, payload) =>
    await (
      await axios.post(`${baseUrl}/${createWorkspaceURL}`, payload, {
        headers: { "x-firebase-token": token },
      })
    ).data;
}
