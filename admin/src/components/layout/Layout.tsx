import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { connect } from "react-redux";
import { getUserProfile } from "../../redux/action/getLoggedUserAction";

interface ILayoutProps {
  admin: any;
  getUserProfile: () => void;
}
const Layout: React.FC<ILayoutProps> = ({ admin, getUserProfile }) => {
  const [isOpen, setIsClose] = useState<boolean>(true);
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

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
  admin: state.admin.user.data,
});

const mapDispatchToProps = {
  getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
