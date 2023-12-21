import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  userProfileRequest,
  userProfileSuccess,
  userProfileFailure,
} from "../../redux/action/getLoggedUserAction";
import { fetchUserProfile } from "../../service/commonService";

const Layout = () => {
  const dispatch = useDispatch();
  const admin: any = useSelector((state: any) => state.admin.user.data);
  const loginToken = useSelector((state: any) => state.login.token);
  const [isOpen, setIsClose] = useState<boolean>(true);
  const getLoggedProfile = async () => {
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
  useEffect(() => {
    getLoggedProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginToken]);

  const toggleSidebar = () => {
    setIsClose((toogle) => !toogle);
  };

  if (!admin) {
    return null;
  }

  return (
    <div>
      <Grid className="layout">
        <Grid className={isOpen ? "layout-sidebar" : "layout-sidebar-sm"}>
          <Sidebar adminId={admin} />
        </Grid>
        <Grid className="layout-navbar">
          <Navbar toogleSidebar={toggleSidebar} admin={admin} />
        </Grid>
        <Grid className="outlet">
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
