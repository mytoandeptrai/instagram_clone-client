import React from "react";
import CardActions from "./CardActions";
import CardComments from "./CardComments";
import "./index.scss";
const CardFooter = ({ post, handleCheck }) => {
  return (
    <>
      <div className="card-footer-container">
        <CardActions post={post} />
        <CardComments post={post} handleCheck={handleCheck} />
      </div>
    </>
  );
};

export default CardFooter;
