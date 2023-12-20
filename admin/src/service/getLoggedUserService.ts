// getLoggedUserService.ts
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = process.env.REACT_APP_API;

export interface IUser {
  data: any;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  picture: string;
}

export const fetchUserProfile = async (
  accessToken: string
): Promise<AxiosResponse<IUser> | undefined> => {
  try {
    const response = await axios.get<IUser>(
      `${API_BASE_URL}/admin/loggedProfile`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    return undefined;
  }
};
