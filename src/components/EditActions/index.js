import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./index.scss";

const EditActions = () => {
  const menuLinks = [
    {
      label: "Edit Profile",
      path: "/edit",
    },
    {
      label: "Change Password",
      path: "/changePassword",
    },
  ];

  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <>
      <div className="edit-actions">
        <ul className="edit-actions-list">
          {menuLinks.map((menu, index) => (
            <li
              key={index}
              className={`edit-actions-items ${isActive(menu.path)}`}
            >
              <Link to={`${menu.path}`}>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EditActions;
