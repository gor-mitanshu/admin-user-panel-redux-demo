import axios, { AxiosResponse } from "axios";
import { IUser } from "../redux/type";

const API_BASE_URL = process.env.REACT_APP_API;

export const fetchViewUserService = async (
  userId: string,
  accessToken: string
): Promise<AxiosResponse<IUser> | undefined> => {
  try {
    const response = await axios.get<IUser>(
      `${API_BASE_URL}/user/getUser/${userId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    return undefined;
  }
};
