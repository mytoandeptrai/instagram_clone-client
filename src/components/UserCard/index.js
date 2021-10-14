import React from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../ProfileIcon";
import "./index.scss";
const UserCard = ({
  children,
  key,
  user,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  underline,
  msg,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  const showMsg = (user) => {
    return (
      <>
        
      </>
    )
  }

  return (
    <>
      <div className={msg ? "user-container-msg" : "user-container"}>
        <div className="user-details">
          <Link
            to={`/profile/${user._id}`}
            onClick={handleCloseAll}
            className="user-profile"
          >
            <ProfileIcon src={user.avatar} size="big-avatar" />
            <div
              className={`user-content ${underline ? "underline" : ""}`}
              style={{ transform: "translateY(-3px)" }}
            >
              <span>{user.username}</span>
              <small>
                {user.text || user.media ? user.text : user.fullname}
              </small>
            </div>
          </Link>
          {children}
        </div>
      </div>
    </>
  );
};

export default UserCard;
