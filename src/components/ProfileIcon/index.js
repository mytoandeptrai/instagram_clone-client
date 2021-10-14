import React from "react";
import "./index.scss";
const ProfileIcon = ({ src, size }) => {
  return (
    <>
      <img
        src={src}
        style={{ objectFit: "cover" }}
        alt="avatar"
        className={size}
      />
    </>
  );
};

export default ProfileIcon;
