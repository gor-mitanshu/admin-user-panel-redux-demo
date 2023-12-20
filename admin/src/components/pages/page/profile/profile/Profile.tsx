import React, { useEffect } from "react";
import { getUserProfile } from "../../../../../redux/action/getLoggedUserAction";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.admin);
  const getLoggedProfile = async () => {
    try {
      dispatch<any>(getUserProfile());
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getLoggedProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {!userState.loading ? (
        <>
          <Typography
            textAlign={"center"}
            className="font"
            color="black"
            variant="h3"
            paddingBottom={3}
          >
            Profile
          </Typography>
          <Grid container display={"flex"} justifyContent={"center"}>
            {userState.user !== null ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  {userState.user?.data?.picture ? (
                    <Avatar
                      src={`${process.env.REACT_APP_API}/adminImages/${userState.user?.data?.picture}`}
                      alt={userState.user?.data?.firstname
                        .concat(".", userState.user?.data?.lastname)
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")
                        .toUpperCase()}
                      sx={{
                        width: "150px",
                        height: "150px",
                        margin: "0 auto 20px",
                      }}
                    />
                  ) : null}
                  <Typography variant="h4" gutterBottom>
                    {userState.user?.data?.firstname}{" "}
                    {userState.user?.data?.lastname}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <b>Email:</b> {userState.user?.data?.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <b>Phone:</b> {userState.user?.data?.phone}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ marginTop: "10px", width: "100%" }}
                    onClick={() =>
                      navigate(`/update/${userState.user?.data?._id}`)
                    }
                  >
                    Update
                  </Button>
                </div>
              </>
            ) : (
              ""
            )}
          </Grid>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Profile;
