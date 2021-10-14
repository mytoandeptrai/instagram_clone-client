import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { logoutAction } from "../../../redux/actions/authActions";
import ProfileIcon from "../../ProfileIcon";
import Notifications from "../Notifications";
import "./index.scss";
const Menu = () => {
  const navLinks = [
    {
      label: "Home",
      icon: "home",
      path: "/",
    },
    {
      label: "Message",
      icon: "near_me",
      path: "/message",
    },
    {
      label: "Discover",
      icon: "explore",
      path: "/discover",
    },
  ];

  const { auth, news } = useSelector((state) => state);
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [isShowActions, setIsShowActions] = useState(false);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  const handleShowNoti = () => {
    if (isShowActions) setIsShowActions(false);
    setIsShowNoti(!isShowNoti);
  };

  const handleShowActions = () => {
    if (isShowNoti) setIsShowNoti(false);
    setIsShowActions(!isShowActions);
  };

  return (
    <>
      <div className="menu-container">
        <ul className="menu-navbar">
          {navLinks.map((link, index) => (
            <li
              className={`menu-navbar-items ${isActive(link.path)}`}
              key={index}
            >
              <Link className="menu-navbar-link" to={link.path}>
                <span className="material-icons menu-navbar-icon">
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}

          <li
            className={`menu-navbar-items menu-navbar-dropdown menu-navbar-notifies ${
              isShowNoti ? "show" : ""
            }`}
            onClick={handleShowNoti}
            style={{ opacity: 1 }}
          >
            <span className="material-icons menu-navbar-icon">favorite</span>
            <div className={`dropdown-notifies ${isShowNoti ? "show" : ""}`}>
              <Notifications />
            </div>
          </li>

          <li
            className={`menu-navbar-items menu-navbar-dropdown menu-navbar-profile ${
              isShowActions ? "show" : ""
            }`}
            onClick={handleShowActions}
            style={{ opacity: 1 }}
          >
            <span id="navbarDropdown">
              <ProfileIcon src={auth.user.avatar} size="medium-avatar" />
            </span>
            <div className={`dropdown-menu ${isShowActions ? "show" : ""}`}>
              <div className="dropdown-menu-actions">
                <Link
                  className="dropdown-menu-items"
                  to={`/profile/${auth.user._id}`}
                >
                  <p className="dropdown-menu-profile">Profile</p>
                </Link>
                <Link className="dropdown-menu-items" to="/saved">
                  <p className="dropdown-menu-saved">Saved</p>
                </Link>
                <Link className="dropdown-menu-items" to={`/edit`}>
                  <p className="dropdown-menu-settings">Settings</p>
                </Link>
                <Link
                  className="dropdown-menu-items"
                  to="/"
                  onClick={() => dispatch(logoutAction())}
                >
                  Logout
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
