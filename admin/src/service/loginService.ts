import axios, { AxiosResponse } from "axios";

const API_BASE_URL = process.env.REACT_APP_API;

export interface IUser {
  email: string;
  password: string;
}

// Login
export const login = async (user: IUser) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/signin`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred";
  }
};

// Getuser from token
export const getUserProfile = async (): Promise<
  AxiosResponse<any> | undefined
> => {
  try {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      return undefined;
    }
    const response = await axios.get<IUser>(
      `${API_BASE_URL}/user/loggedProfile`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    return undefined;
  }
};

// Get Profile from Id
export const getProfileById = async (
  id: string | any
): Promise<AxiosResponse<IUser> | undefined> => {
  try {
    const response = await axios.get<IUser>(
      `${API_BASE_URL}/user/getuser/${id}`
    );
    return response;
  } catch (error) {
    return undefined;
  }
};
