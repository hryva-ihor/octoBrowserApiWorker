import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Box from "@mui/material/Box";
import { NavLink, Link } from "react-router-dom";
import "./Appbar.scss";

// import { ModalLogout } from "../ModalLogout";
import { ModalContext } from "../../context/ModalContext";
import { useSelector } from "react-redux";

const Appbar = () => {
  const pages = [{ title: "API worker", href: "/API-worker" }];
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { email } = useSelector((state) => state.user);
  const getStorageEmail = localStorage.getItem("email");
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hryva
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <NavLink className="nav-link nav-link__dark" to={page.href}>
                    <Button>{page.title}</Button>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="p"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,

              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hryva
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <NavLink key={index} className="nav-link" to={page.href}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ m: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box>
            <Box sx={{ color: "white" }}>
              {getStorageEmail || email ? (
                <Button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Sign out
                  <Typography sx={{ color: "lightgreen" }}>
                    {" "}
                    {"\u00A0"}
                    {getStorageEmail || email}
                  </Typography>
                </Button>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Button sx={{ color: "white" }}>Sign in</Button>
                </Link>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
