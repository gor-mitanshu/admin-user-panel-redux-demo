import axios from "axios";
import { AxiosResponse } from "axios";
import { IUser } from "../redux/type";

const API_BASE_URL = process.env.REACT_APP_API;

export const getUsersService = async (
  accessToken: string
): Promise<AxiosResponse<IUser[]> | undefined> => {
  try {
    const response = await axios.get<IUser[]>(`${API_BASE_URL}/user/getUsers`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return undefined;
  }
};
