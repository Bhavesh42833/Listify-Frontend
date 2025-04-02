import React, { useState, useContext } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, HomeOutlined, Search, SearchOutlined, Add, AddOutlined, AccountCircle } from "@mui/icons-material";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { DarkModeOutlined,LightModeOutlined } from "@mui/icons-material";
import DarkMode from "./DarkMode.jsx";

const FloatingNavbar = ({ image }) => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [tab, setTab] = useState(window.location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error("Logout failed");
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <AppBar
      position="relative"
      sx={{
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "250px",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <Link to="/" onClick={() => setTab("/")}>{tab === '/' ? <Home style={{ color: "black" }} /> : <HomeOutlined style={{ color: "grey" }} />}</Link>
        <Link to="/create" onClick={() => setTab("/create")}>{tab === '/create' ? <Add style={{ color: "black" }} /> : <AddOutlined style={{ color: "grey" }} />}</Link>
        <Link to="/search" onClick={() => setTab("/search")}>{tab === '/search' ? <Search style={{ color: "black" }} /> : <SearchOutlined style={{ color: "grey" }} />}</Link>
        <DarkMode />
        <IconButton onClick={handleClick}>
          {image ? <Avatar src={image} style={{ width: "2.2vmax", height: "2.2vmax" }} /> : <AccountCircle style={{ color: "grey" }} />}
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => { handleClose(); logoutHandler(); }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default FloatingNavbar;