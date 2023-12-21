import axios, { AxiosResponse } from "axios";

const API_BASE_URL = process.env.REACT_APP_API;

export const signUp = async (formData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signIn = async (user: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signin`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const fetchUserProfile = async (
  accessToken: string
): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = await axios.get<any>(
      `${API_BASE_URL}/user/loggedProfile`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred";
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
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred";
  }
};
