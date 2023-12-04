import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../../../../redux/authAction";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { RootState } from "../../../../../redux/store";
import { useNavigate } from "react-router-dom";

interface IProfileProps {
  user: any;
  loading: boolean;
  fetchUserProfile: () => void;
}

const Profile: React.FC<IProfileProps> = ({
  user,
  loading,
  fetchUserProfile,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <>
      {!loading ? (
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
            {user !== null ? (
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
            width: "100%",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  fetchUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
