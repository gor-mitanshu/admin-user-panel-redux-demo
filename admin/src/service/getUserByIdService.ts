import axios from "axios";
import { AxiosResponse } from "axios";

const API_BASE_URL = process.env.REACT_APP_API;

export const getUserByIdService = async (
  id: any,
  accessToken: string
): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/getUser/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return undefined;
  }
};
