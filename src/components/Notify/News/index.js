import React from "react";
import Fade from "react-reveal/Fade";
import "./index.scss";
const News = ({ msg, handleShow, bgColor }) => {
  return (
    <>
      <Fade left cascade>
        <div className={`news text-light ${bgColor}`}>
          <div className={`news-header text-light ${bgColor}`}>
            <strong className="text-light">{msg.title}</strong>
            <button className={`text-light ${bgColor}`} onClick={handleShow}>
              &times;
            </button>
          </div>
          <div className="news-body">{msg.body}</div>
        </div>
      </Fade>
    </>
  );
};

export default News;
