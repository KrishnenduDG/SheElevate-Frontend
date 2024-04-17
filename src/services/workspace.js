import { baseUrl } from "@/constants";
import axios from "axios";
import { getWorkspaceDetailsURL, getWorkspacesForUserURL } from "./urls";
export class WorkspaceService {
  constructor() {}

  getWorkspaceDetails = async (token, username, workspaceName) =>
    await (
      await axios.get(
        `${baseUrl}/${getWorkspaceDetailsURL}/${username}/${workspaceName}`,
        { headers: { "x-firebase-token": token } }
      )
    ).data;

  getAllWorkspacesForUser = async (token) =>
    await (
      await axios.get(`${baseUrl}/${getWorkspacesForUserURL}`, {
        headers: { "x-firebase-token": token },
      })
    ).data;
}
