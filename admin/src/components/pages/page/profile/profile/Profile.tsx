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
import { useNavigate } from "react-router-dom";

interface IProfileProps {
  admin: any;
  loading: boolean;
  fetchUserProfile: () => void;
}

const Profile: React.FC<IProfileProps> = ({
  admin,
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
            {admin !== null ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  {admin?.picture ? (
                    <Avatar
                      src={`${process.env.REACT_APP_API}/adminImages/${admin?.picture}`}
                      alt={admin?.firstname
                        .concat(".", admin?.lastname)
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
                    {admin?.firstname} {admin?.lastname}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <b>Email:</b> {admin?.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <b>Phone:</b> {admin?.phone}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ marginTop: "10px", width: "100%" }}
                    onClick={() => navigate(`/update/${admin?._id}`)}
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

const mapStateToProps = (state: any) => ({
  admin: state.user,
  loading: state.loading,
});

const mapDispatchToProps = {
  fetchUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
