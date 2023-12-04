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

// Login
export const loginService = async (
  email: string,
  password: string
): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = await axios.post<any>(`${API_BASE_URL}/user/signin`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.data);
    return response;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Getuser from token
export const getUserProfile = async (): Promise<
  AxiosResponse<IUser> | undefined
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
