import axios from "axios";

const API_URL = process.env.REACT_APP_API;

const signUp = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const userService = {
  signUp,
};
