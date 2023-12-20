import axios, { AxiosResponse } from "axios";
import { IUser } from "../redux/type";

const API_BASE_URL = process.env.REACT_APP_API;
export interface ILoggedProfile {
  data: any;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  picture: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export const composeEmailService = async (
  emailData: any,
  accessToken: string
): Promise<string | undefined> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/sendMail`,
      emailData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.message;
  } catch (error) {
    return undefined;
  }
};

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

export const fetchUserProfile = async (
  accessToken: string
): Promise<AxiosResponse<ILoggedProfile> | undefined> => {
  try {
    const response = await axios.get<ILoggedProfile>(
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

export const getUserCountService = async (
  accessToken: string
): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/getUserCounts`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return undefined;
  }
};

export const login = async (user: ILogin) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/signin`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred";
  }
};

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
