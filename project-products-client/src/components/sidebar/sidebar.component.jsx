import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import FaceIcon from "@mui/icons-material/Face";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import "./style.css";

export const SidebarComponent = (props) => {
  const { logout } = useAuth0();
  return (
    <ul className="container">
      <li>
        <Link to="/">
          <HomeIcon className="icon" />
          <div className="section-name">Home Page</div>
        </Link>
      </li>
      <li>
        <Link to="/about">
          <InfoIcon className="icon" />
          <div className="section-name">About</div>
        </Link>
      </li>
      <li>
        <Link to="/contact-us">
          <CallIcon className="icon" />
          <div className="section-name">Contact Us</div>
        </Link>
      </li>
      <li>
        <Link to="/products">
          <ShoppingCartTwoToneIcon className="icon" />
          <div className="section-name">Products</div>
        </Link>
      </li>
      <li>
        <Link className="nav-link disabled"></Link>
      </li>
      <li>
        <Link className="nav-link disabled"></Link>
      </li>
      <li>
        <Link className="nav-link disabled"></Link>
      </li>
      <li>
        <Link to="/user">
          <FaceIcon className="icon" />
          <div className="section-name">User</div>
        </Link>
      </li>
      <li>
        <Link className="nav-link disabled"></Link>
      </li>
      <li>
        <Link className="nav-link disabled"></Link>
      </li>
      <li>
        <Link className="nav-link disabled"></Link>
      </li>
      <li>
        <button
          className="logout"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <LogoutRoundedIcon className="icon" />
          <div className="section-name">Log Out</div>
        </button>
      </li>
    </ul>
  );
};
