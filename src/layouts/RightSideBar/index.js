import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingIcon from "../../assets/images/loading.gif";
import FollowBtn from "../../components/FollowBtn";
import ProfileIcon from "../../components/ProfileIcon";
import UserCard from "../../components/UserCard";
import "./index.scss";
const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const newArr = [...suggestions.users].splice(0, 4);
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-user">
          <div className="sidebar-user-img">
            <ProfileIcon src={auth.user.avatar} size="huge-avatar" />
          </div>
          <div className="sidebar-user-owner">
            <Link to={`/profile/${auth.user._id}`}>{auth.user.fullname}</Link>
            <span>{auth.user.username}</span>
          </div>
        </div>
        <div className="sidebar-suggestions">
          <div className="sidebar-suggestions-heading">
            <h3>Suggestions For You</h3>
            <Link to="/exploreAll">See All</Link>
          </div>
          <div className="sidebar-suggestions-details">
            {suggestions.loading ? (
              <img
                src={LoadingIcon}
                alt="Loading"
                className="sidebar-suggestions-loading"
              />
            ) : (
              <>
                <div className="sidebar-suggestions-users">
                  {newArr.map((user) => (
                    <UserCard key={user._id} user={user}>
                      <FollowBtn user={user} profiles={false} />
                    </UserCard>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
