import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followAction,
  unFollowAction,
} from "../../redux/actions/profileActions";
import "./index.scss";
const FollowBtn = ({ profiles, user }) => {
  const [followed, setFollowed] = useState(false);
  const [load, setLoad] = useState(false);
  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(followAction({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(
      unFollowAction({ users: profile.users, user, auth, socket })
    );
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <button
          className={
            profiles
              ? "follow-btn follow-btn-user unfollow"
              : "follow-btn follow-btn-suggestion unfollow-sug"
          }
          onClick={handleUnFollow}
        >
          UnFollow
        </button>
      ) : (
        <button
          className={
            profiles
              ? "follow-btn follow-btn-user"
              : "follow-btn follow-btn-suggestion"
          }
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
