import axios from "axios";

export const setUserProfile = (user: any) => ({
  type: "SET_USER_PROFILE",
  payload: user,
});

export const fetchUserProfile = () => {
  return async (dispatch: any) => {
    try {
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      if (accessToken) {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/user/loggedProfile`,
          {
            headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
          }
        );
        if (!!res) {
          dispatch(setUserProfile(res.data.data));
        } else {
          console.error("User not found");
        }
      } else {
        console.error("error");
      }
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };
};
