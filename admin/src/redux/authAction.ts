import axios from "axios";

export const setUserProfile = (user: any) => ({
  type: "SET_ADMIN_PROFILE",
  payload: user,
});

export const fetchUserProfile = () => {
  return async (dispatch: any) => {
    try {
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      if (accessToken) {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/admin/loggedProfile`,
          {
            headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
          }
        );
        if (!!res) {
          dispatch(setUserProfile(res.data.data));
        } else {
          console.log("User not found");
        }
      } else {
        console.log("error");
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};
