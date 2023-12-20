import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API;

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
