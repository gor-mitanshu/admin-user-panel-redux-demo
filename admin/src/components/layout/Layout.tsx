import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../redux/authAction";

interface ILayoutProps {
  admin: any;
  fetchUserProfile: () => void;
}

const Layout: React.FC<ILayoutProps> = ({ admin, fetchUserProfile }) => {
  const [isOpen, setIsClose] = useState<boolean>(true);
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

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

const mapStateToProps = (state: any) => ({
  admin: state.user,
});

const mapDispatchToProps = {
  fetchUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
