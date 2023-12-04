import React from "react";
import {
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Zoom,
} from "@mui/material";
import {
  Dashboard,
  Key,
  Logout,
  Person,
  Person2TwoTone,
} from "@mui/icons-material";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../pages/protectedRoute/AuthContext";

const Sidebar = ({ adminId }: any): JSX.Element => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/signin");
    toast.success("Logged Out Successfully");
  };

  const sidebarItems = [
    { label: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { label: "Profile", icon: <Person />, path: "/profile" },
    { label: "Users", icon: <Person2TwoTone />, path: "/users" },
    {
      label: "Change Password",
      icon: <Key />,
      path: `/changepassword/${adminId._id}`,
    },
  ];

  return (
    <>
      <Grid className="sidebar">
        <Grid item lg={12} sm={6} xs={3}>
          <Toolbar />

          {sidebarItems.map((item, index) => (
            <div key={index}>
              <Divider />
              <NavLink to={item.path} className="link">
                <ListItem disablePadding className="sidebar-item">
                  <Tooltip
                    title={item.label}
                    arrow
                    TransitionComponent={Zoom}
                    enterDelay={800}
                    leaveDelay={200}
                    placement="bottom"
                  >
                    <ListItemButton className="sidebar-listitem-btn">
                      <ListItemIcon className="sidebar-icon">
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        sx={{ whiteSpace: "nowrap" }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              </NavLink>
            </div>
          ))}

          <Divider />

          <ListItem disablePadding className="sidebar-item logout">
            <Tooltip
              title={"Logout"}
              arrow
              TransitionComponent={Zoom}
              enterDelay={800}
              leaveDelay={200}
              placement="bottom"
            >
              <ListItemButton
                className="sidebar-listitem-btn"
                onClick={handleLogout}
              >
                <ListItemIcon className="sidebar-icon">
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ whiteSpace: "nowrap" }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default Sidebar;
