import React from "react";
import LeftSide from "../../components/LeftSide";
import "./index.scss";
import RightSide from "../../components/RightSide";
const MessageUser = () => {
  return (
    <>
      <div className="message-container">
        <div className="message-inner">
          <div className="message-leftSide">
            <LeftSide />
          </div>
          <div className="message-rightSide">
            <RightSide />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageUser;
