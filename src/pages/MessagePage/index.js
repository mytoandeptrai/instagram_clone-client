import React from "react";
import LeftSide from "../../components/LeftSide";
import "./index.scss";
const MessagePage = () => {
  return (
    <>
      <div className="message-container">
        <div className="message-inner">
          <div className="message-leftSide">
            <LeftSide />
          </div>
          <div className="message-rightSide">
            <div className="message-intro">
              <i className="fab fa-facebook-messenger message-intro-icon"></i>
              <h4 className="message-intro-heading">Messenger</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
