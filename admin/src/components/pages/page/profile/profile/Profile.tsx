import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet";

interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  picture: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
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
            setLoading(false);
            setUser(res.data.data);
          } else {
            console.log("User not found");
          }
        } else {
          setLoading(false);
          console.log("error");
        }
      } catch (error: any) {
        setLoading(false);
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Helmet>
            <title>Admin Panel - Profile</title>
          </Helmet>
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
            {user ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  {user?.picture ? (
                    <Avatar
                      src={`${process.env.REACT_APP_API}/adminImages/${user?.picture}`}
                      alt={user?.firstname
                        .concat(".", user?.lastname)
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
                    {user?.firstname} {user?.lastname}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <b>Email:</b> {user?.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <b>Phone:</b> {user?.phone}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ marginTop: "10px", width: "100%" }}
                    onClick={() => navigate(`/update/${user?._id}`)}
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
            // height: "100vh",
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
