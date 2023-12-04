import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { RootState } from "../../redux/store";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../redux/authAction";

interface ILayoutProps {
  user: any;
  fetchUserProfile: () => void;
}

const Layout: React.FC<ILayoutProps> = ({ user, fetchUserProfile }) => {
  const [isOpen, setIsClose] = useState<boolean>(true);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

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
          <Sidebar userId={user} />
        </Grid>
        <Grid className="layout-navbar">
          <Navbar toogleSidebar={toggleSidebar} user={user} />
        </Grid>
        <Grid className="outlet">
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  fetchUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
