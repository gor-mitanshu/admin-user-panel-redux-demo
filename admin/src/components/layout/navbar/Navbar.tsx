import React, { useState } from "react";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

const Navbar = ({ toogleSidebar, admin }: any): JSX.Element => {
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
          <div
            className="justify-end justify-center"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {admin?.picture ? (
              <Avatar
                src={
                  admin?.picture
                    ? `${process.env.REACT_APP_API}/adminImages/${admin?.picture}`
                    : ""
                }
                alt={admin?.firstname
                  .concat(".", admin?.lastname)
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")
                  .toUpperCase()}
                sx={{
                  width: "40px",
                  height: "40px",
                  // margin: "0 auto 20px",
                }}
              />
            ) : null}
            <Typography className="navbar-title ellipsis">
              {admin.firstname}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
