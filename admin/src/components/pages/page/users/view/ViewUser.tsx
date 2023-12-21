import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import ComposeEmailModal from "../email/ComposeEmailModal";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import {
  fetchViewUserFailure,
  fetchViewUserSuccess,
} from "../../../../../redux/action/viewUserAction";
import {
  userProfileFailure,
  userProfileRequest,
  userProfileSuccess,
} from "../../../../../redux/action/getLoggedUserAction";
import {
  fetchUserProfile,
  fetchViewUserService,
} from "../../../../../service/commonService";

interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  picture: string;
  status: string;
}

const ViewUser = () => {
  const dispatch = useDispatch();
  const viewUser: IUser = useSelector((state: any) => state.viewUser.user);
  const admin: any = useSelector((state: any) => state.admin.user);
  const loginToken = useSelector((state: any) => state.login.token);
  const viewUserError = useSelector((state: RootState) => state.viewUser.error);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isComposeModalOpen, setComposeModalOpen] = useState(false);

  useEffect(() => {
    const viewUser = async () => {
      if (viewUserError) {
        console.log(viewUserError);
      }
      if (!!id) {
        try {
          if (loginToken) {
            const response: any = await fetchViewUserService(id, loginToken);
            if (response && response.data) {
              dispatch(fetchViewUserSuccess(response.data.data));
            } else {
              dispatch(fetchViewUserFailure("Failed to fetch user details"));
            }
          } else {
            dispatch(fetchViewUserFailure("Token not found"));
          }
        } catch (error: any) {
          console.error("Error fetching user details:", error);
          dispatch(
            fetchViewUserFailure(
              error.response?.data.message || "Error fetching user details"
            )
          );
        }
      }
    };
    viewUser();
  }, [dispatch, id, loginToken, viewUserError]);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch<any>(userProfileRequest());
        if (loginToken) {
          const response = await fetchUserProfile(loginToken);
          if (response && response.data) {
            dispatch<any>(userProfileSuccess(response.data));
          } else {
            console.log("User not found");
            dispatch<any>(userProfileFailure());
          }
        } else {
          console.log("Token not found");
          dispatch<any>(userProfileFailure());
        }
      } catch (error: any) {
        console.log(error.response?.data.message || "An error occurred");
        dispatch<any>(userProfileFailure());
      }
    };
    getUser();
  }, [dispatch, loginToken]);

  const openComposeModal = () => {
    setComposeModalOpen(true);
  };

  const closeComposeModal = () => {
    setComposeModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel - View User</title>
      </Helmet>
      <Typography className="font" color="black" variant="h3" paddingBottom={3}>
        User Details
      </Typography>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {viewUser ? (
          <Grid item xs={11} sm={10} lg={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <ArrowBack
                fontSize="large"
                onClick={() => navigate(`/users`)}
                style={{ cursor: "pointer" }}
              />
              <Button
                variant="contained"
                color="error"
                onClick={openComposeModal}
              >
                Compose
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexWrap: "wrap",
                paddingTop: "40px",
                paddingBottom: "40px",
                borderRadius: "6px",
                background:
                  viewUser.status === "active"
                    ? "rgba(0, 128, 0, 0.2)"
                    : "rgba(255, 0, 0, 0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Avatar
                  src={
                    viewUser?.picture
                      ? `${process.env.REACT_APP_API}/userImages/${viewUser?.picture}`
                      : ""
                  }
                  alt={viewUser.firstname
                    .concat(".", viewUser.lastname)
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")
                    .toUpperCase()}
                  sx={{
                    width: "150px",
                    height: "150px",
                    marginBottom: "10px",
                    // border: "1px solid black",
                  }}
                  // style={{ backgroundColor: getRandomColor() }}
                />
                {viewUser.picture !== "" && (
                  <Link
                    to={`${process.env.REACT_APP_API}/userImages/${viewUser?.picture}`}
                    target="_blank"
                  >
                    <Button
                      type="button"
                      // color="info"
                      sx={{ color: "black", borderColor: "black" }}
                      size="large"
                      variant="outlined"
                    >
                      View Image
                    </Button>
                  </Link>
                )}
              </div>
              <div>
                <Typography variant="h4" marginBottom={2}>
                  {viewUser?.firstname} {viewUser?.lastname}
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  <b>Email:</b> {viewUser?.email}
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  <b>Phone:</b> {viewUser?.phone}
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      // backgroundColor:
                      //   user?.status === "active"
                      //     ? "rgba(0, 128, 0, 0.4)"
                      //     : user?.status === "inactive"
                      //     ? "rgba(255, 0, 0, 0.4)"
                      //     : "inherit",
                      color:
                        viewUser?.status === "active"
                          ? "rgb(43,182,115)"
                          : viewUser?.status === "inactive"
                          ? "rgb(255,0,0)"
                          : "inherit",
                      fontWeight:
                        viewUser?.status === "active" ||
                        viewUser?.status === "inactive"
                          ? 700
                          : "inherit",
                    }}
                  >
                    {viewUser?.status.toUpperCase()}
                  </span>
                </Typography>
              </div>
            </div>
          </Grid>
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
      </Grid>

      {/* Compose Email Modal */}
      <ComposeEmailModal
        open={isComposeModalOpen}
        onClose={closeComposeModal}
        to={viewUser?.email || ""}
        from={admin?.email || ""}
      />
    </>
  );
};

export default ViewUser;
