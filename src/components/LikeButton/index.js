import React from "react";
import "./index.scss";
const LikeButton = ({ isLike, handleLike, handleUnLike, details }) => {
  return (
    <>
      {isLike ? (
        <i
          className={details ? "fas fa-heart red small" : "fas fa-heart red"}
          onClick={handleUnLike}
        ></i>
      ) : (
        <i
          className={details ? "far fa-heart small" : "far fa-heart"}
          onClick={handleLike}
        />
      )}
    </>
  );
};

export default LikeButton;
