import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API;

export interface IUser {
  email: string;
  password: string;
}

export const login = async (user: IUser) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/signin`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred";
  }
};
