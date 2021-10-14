import React from "react";
import Comments from "../../../components/Comments";
import ProfileIcon from "../../../components/ProfileIcon";
import "./index.scss";
const PostList = ({ post, handleCheck }) => {
  return (
    <>
      <div className="posts-list">
        <div className="posts-list-desc">
          <div className="posts-list-image">
            <ProfileIcon src={post.user.avatar} size="profile-avatar" />
          </div>
          <div className="posts-list-title">
            <span className="posts-list-author">{post.user.username}</span>{" "}
            {post.content}
          </div>
        </div>
        <div className="post-list-item">
          <Comments post={post} handleCheck={handleCheck} />
        </div>
      </div>
    </>
  );
};

export default PostList;
