import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import axios from "axios";

const Layout = (): JSX.Element => {
  const [isOpen, setIsClose] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsClose((toogle) => !toogle);
  };

  const [admin, setAdmin] = useState<any>("");

  useEffect(() => {
    const getUserData = async () => {
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
          if (res && res.data.data) {
            setAdmin(res.data.data);
          }
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    getUserData();
  }, []);

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
