import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
const PostThumb = ({ posts, result }) => {
  if (result === 0) return <h2 className="post-thumb-warning">No Post</h2>;
  return (
    <>
      <div className="post-thumb-container">
        {posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <div className="post-thumb-display">
              {post.images[0].url.match(/video/i) ? (
                <video controls src={post.images[0].url} alt="thumb" />
              ) : (
                <img src={post.images[0].url} alt="thumb" />
              )}

              <div className="post-thumb-menu">
                <i className="far fa-heart">{post.likes.length}</i>
                <i className="far fa-comment">{post.comments.length}</i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PostThumb;
