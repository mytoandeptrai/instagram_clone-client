import React from "react";
import { useSelector } from "react-redux";
import FollowBtn from "../../components/FollowBtn";
import UserCard from "../../components/UserCard";
import "./index.scss";
const Followers = ({ users, setShowFollowers }) => {
  const { auth } = useSelector((state) => state);

  return (
    <>
      <div className="follows">
        <div className="follows-container">
          <h5 className="follows-heading">Followers</h5>
          <hr className="follows-line" />
          <div className="follows-content">
            {users.map((user) => (
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
          </div>

          <div
            className="follows-close"
            onClick={() => setShowFollowers(false)}
          >
            &times;
          </div>
        </div>
      </div>
    </>
  );
};

export default Followers;
