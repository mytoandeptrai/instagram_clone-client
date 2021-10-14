import React from "react";
import { useSelector } from "react-redux";
import FollowBtn from "../../components/FollowBtn";
import UserCard from "../../components/UserCard";

const Following = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);

  return (
    <>
      <div className="follows">
        <div className="follows-container">
          <h5 className="follows-heading">Following</h5>
          <hr />
          <div className="follows-content">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                setShowFollowing={setShowFollowing}
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
            onClick={() => setShowFollowing(false)}
          >
            &times;
          </div>
        </div>
      </div>
    </>
  );
};

export default Following;
