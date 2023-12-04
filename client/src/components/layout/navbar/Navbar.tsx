import React, { useState } from "react";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

const Navbar = ({ toogleSidebar, user }: any): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleSiderbar = () => {
    setOpen(!isOpen);
    toogleSidebar(isOpen);
  };

  return (
    <div>
      <AppBar className="appbar">
        <Toolbar className="toolbar-navbar">
          <MenuIcon className="menu-icon" onClick={toogleSiderbar} />
          {/* <Grid className="navbar-name-content-center">
              <Typography className="navbar-title">Panel</Typography>
            </Grid> */}
          <div
            className="justify-end justify-center"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {user?.picture ? (
              <Avatar
                src={`${process.env.REACT_APP_API}/userImages/${user?.picture}`}
                alt={user?.firstname
                  .concat(".", user?.lastname)
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")
                  .toUpperCase()}
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              />
            ) : null}
            <Typography className="navbar-title ellipsis">
              {user.firstname}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
