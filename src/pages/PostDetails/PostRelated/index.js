import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedPostAction } from "../../../redux/actions/postActions";
import LoadingIcon from "../../../assets/images/loading.gif";
import "./index.scss";
import PostThumb from "../../../components/PostProfile/PostThumb";
import { Link } from "react-router-dom";
const PostRelated = ({ post, auth }) => {
  const { homePosts } = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoad(true);
    dispatch(getRelatedPostAction({ post, auth }));
    setLoad(false);
  }, [post, auth, dispatch]);
  return (
    <>
      <div className="post-related-container">
        {load && (
          <div className="post-related-loading">
            <img src={LoadingIcon} alt="LoadingIcon" />
          </div>
        )}
        <Link to={`/profile/${post.user._id}`} className="post-related-heading">
          More posts from <span>{post.user.username}</span>
        </Link>

        <div className="post-related-details">
          <PostThumb
            posts={homePosts.relatedPosts}
            result={homePosts.relatedPosts.length}
          />
        </div>
      </div>
    </>
  );
};

export default PostRelated;
