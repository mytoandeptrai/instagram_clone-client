import React, { useState } from "react";
import "./index.scss";
const Icons = ({ setContent, content }) => {
  const reactions = [
    "❤️",
    "😆",
    "😯",
    "😢",
    "😡",
    "👍",
    "👎",
    "😄",
    "😂",
    "😍",
    "😘",
    "😗",
    "😚",
    "😳",
    "😭",
    "😓",
    "😤",
    "🤤",
    "👻",
    "💀",
    "🤐",
    "😴",
    "😷",
    "😵",
  ];
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="icons-container" onClick={() => setIsShow(!isShow)}>
        <span className="icons-menu">😚</span>

        <div
          className={isShow ? "icons-reactions icons-show" : "icons-reactions"}
        >
          <div className="icons-list">
            {reactions.map((icon, index) => (
              <span key={index} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Icons;
