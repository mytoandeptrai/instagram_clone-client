import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileIcon from "../../ProfileIcon";
import "./index.scss";
import moment from "moment";
import {
  deleteAllNotifies,
  isReadNotify,
} from "../../../redux/actions/newsActions";
const Notifications = () => {
  const { auth, news } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleDeleteAll = () => {
    const newArr = news.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));

    if (
      window.confirm(
        `You have ${newArr.length} unread notices.Are you sure you want to delete them all ?`
      )
    ) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  return (
    <>
      <div className="notify-container">
        <div className="notify-heading">
          <h3>Notifications</h3>
          {/* {news.sound ? (
            <i className="fas fa-bell notify-bell"></i>
          ) : (
            <i className="fas fa-bell-slash notify-bell"></i>
          )} */}
          <span onClick={handleDeleteAll}>Delete All</span>
        </div>
        {news.data.length === 0 && (
          <div className="notify-warning">
            <h4>No Notifications</h4>
          </div>
        )}
        <div className="notify-content">
          {news.data.map((msg, index) => (
            <div key={index}>
              <Link
                to={`${msg.url}`}
                className="notify-details"
                onClick={() => dispatch(() => handleIsRead(msg))}
              >
                <div className="notify-details-img">
                  <ProfileIcon src={msg.user.avatar} size="big-avatar" />
                </div>
                <div className="notify-details-names">
                  <div className="notify-details-urls">
                    <Link
                      to={`/profile/${msg.user._id}`}
                      className="notify-details-links"
                    >
                      {msg.user.username}
                    </Link>
                    <span> {msg.text}</span>
                  </div>
                  <div className="notify-details-date">
                    {msg.content && (
                      <small>{msg.content.slice(0, 20)}....</small>
                    )}
                    <small style={{ marginLeft: "5px", color: "#8e8e8e" }}>
                      {moment(msg.createAt).fromNow()}
                    </small>
                    {!msg.isRead && (
                      <i
                        className="fas fa-circle notify-details-online"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    )}
                  </div>
                </div>
                <div className="notofy-details-post">
                  {msg.image && (
                    <div style={{ width: "30px" }}>
                      {msg.image.match(/video/i) ? (
                        <video src={msg.image} width="100%" />
                      ) : (
                        <ProfileIcon src={msg.image} size="medium-avatar" />
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
