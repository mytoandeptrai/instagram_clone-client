import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowBtn from "../../components/FollowBtn";
import UserCard from "../../components/UserCard";
import { LIKES_USERS_TYPES } from "../../redux/types/likedUsersTypes";
import "./index.scss";
const LikedUsers = () => {
  const { auth, likedUsers } = useSelector((state) => state);
  const [showFollowers, setShowFollowers] = useState(false);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: LIKES_USERS_TYPES.IS_SHOW,
      payload: false,
    });
  };
  return (
    <>
      {(likedUsers === false || likedUsers.length === 0) && <> </>}
      <div className="liked-users">
        <div className="liked-users-container">
          <h5 className="liked-users-heading">Likes</h5>
          <hr className="liked-users-line" />
          {likedUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowers={setShowFollowers}
              underline={true}
            >
              {auth.user._id !== user._id && (
                <FollowBtn user={user} profiles={true} />
              )}
            </UserCard>
          ))}
          <div className="liked-users-close" onClick={closeModal}>
            &times;
          </div>
        </div>
      </div>
    </>
  );
};

export default LikedUsers;
