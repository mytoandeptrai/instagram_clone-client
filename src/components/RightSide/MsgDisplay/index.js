import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageAction } from "../../../redux/actions/messageActions";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import ProfileIcon from "../../ProfileIcon";
import Times from "../../Times";
import "./index.scss";

const MsgDisplay = ({ user, msg, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleDeleteMessage = () => {
    if (data) {
      dispatch(deleteMessageAction({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="msg-title">
        <ProfileIcon src={user.avatar} size="small-avatar" />
      </div>
      <div className="msg-content">
        {user._id === auth.user._id && (
          <div className="msg-action">
            <span className="msg-action-icon" onClick={handleDeleteMessage}>
              Unsend
            </span>
          </div>
        )}

        <div className="msg-details">
          {msg.text && <div className="msg-text">{msg.text}</div>}
          {msg.media.map((item, index) => (
            <div key={index} className="msg-images">
              {item.url.match(/video/i)
                ? videoShow(item.url)
                : imageShow(item.url)}
            </div>
          ))}
        </div>
      </div>

      {msg.call && (
        <button className="msg-btn">
          <span
            className="material-icons msg-btn-span"
            style={{
              fontSize: "2.5rem",
              color: msg.call.times === 0 ? "crimson" : "green",
            }}
          >
            {msg.call.times === 0
              ? msg.call.video
                ? "videocam_off"
                : "phone_disabled"
              : msg.call.video
              ? "video_camera_front"
              : "call"}
          </span>

          <div className="msg-btn-text">
            <h6>{msg.call.video ? "Video call" : "Audio call"}</h6>
            <small>
              {msg.call.times > 0 ? (
                <Times total={msg.call.times} />
              ) : (
                new Date(msg.createdAt).toLocaleTimeString()
              )}
            </small>
          </div>
        </button>
      )}

      <div className="msg-time">{new Date(msg.createdAt).toLocaleString()}</div>
    </>
  );
};

export default MsgDisplay;
