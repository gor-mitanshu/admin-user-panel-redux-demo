import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../redux/action/getLoggedUserAction";
import { fetchUserProfile } from "../../service/commonService";

const Layout = () => {
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => state.user.user);
  const loginToken = useSelector((state: any) => state.login.token);
  const [isOpen, setIsClose] = useState<boolean>(true);
  const getLoggedProfile = async () => {
    try {
      const response = await fetchUserProfile(loginToken);
      if (response && response.data) {
        dispatch<any>(setUserProfile(response.data));
      } else {
        console.error("User not found");
      }
    } catch (error: any) {
      console.error(error.response?.data.message || "An error occurred");
    }
  };
  useEffect(() => {
    getLoggedProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginToken]);

  const toggleSidebar = () => {
    setIsClose((toogle) => !toogle);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Grid className="layout">
        <Grid className={isOpen ? "layout-sidebar" : "layout-sidebar-sm"}>
          <Sidebar userId={user.data._id} />
        </Grid>
        <Grid className="layout-navbar">
          <Navbar toogleSidebar={toggleSidebar} user={user.data} />
        </Grid>
        <Grid className="outlet">
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
