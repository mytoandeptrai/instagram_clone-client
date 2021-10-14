import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FollowBtn from "../../components/FollowBtn";
import ProfileIcon from "../../components/ProfileIcon";
import { MODAL_TYPES } from "../../redux/types/modalTypes";
import Followers from "../Followers";
import Following from "../Following";
import "./index.scss";
const Infos = ({ id, auth, profile, dispatch }) => {
  const { status } = useSelector((state) => state);

  const [userData, setUserData] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth?.user?._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth.user, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || status.onEdit) {
      dispatch({
        type: MODAL_TYPES.MODAL,
        payload: true,
      });
    } else {
      dispatch({
        type: MODAL_TYPES.MODAL,
        payload: false,
      });
    }
  }, [dispatch, showFollowers, showFollowing, status.onEdit]);

  return (
    <>
      <div className="info-container">
        {userData.map((user, index) => (
          <div className="info-content" key={user._id}>
            <div className="info-images">
              <ProfileIcon src={user.avatar} size="supper-avatar" />
            </div>
            <div className="info-details">
              <div className="info-details-header">
                <h1 className="info-details-name">{user.username}</h1>
                {user._id === auth.user._id ? (
                  <Link to="/edit" className="info-details-action">
                    Edit Profile
                  </Link>
                ) : (
                  <FollowBtn profiles={true} user={user} />
                )}
              </div>

              <div className="info-details-followers">
                <span className="info-details-follow">
                  <span className="info-details-count">0</span>
                  {" posts"}
                </span>
                <span className="info-details-follow">
                  <span
                    className="info-details-count"
                    onClick={() => setShowFollowers(true)}
                  >
                    {user.followers.length}
                  </span>
                  {" followers"}
                </span>
                <span className="info-details-follow">
                  <span
                    className="info-details-count"
                    onClick={() => setShowFollowing(true)}
                  >
                    {user.following.length}
                  </span>
                  {" following"}
                </span>
              </div>
              <div className="info-details-desc">
                <h1 className="info-desc-name">{user.fullname}</h1>
                <span className="info-desc-story">{user.story}</span>
                <a
                  href="wwww.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="info-desc-url"
                >
                  {user.webiste}
                </a>
              </div>
            </div>

            {showFollowers && (
              <Followers
                users={user.followers}
                setShowFollowers={setShowFollowers}
              />
            )}
            {showFollowing && (
              <Following
                users={user.following}
                setShowFollowing={setShowFollowing}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Infos;
