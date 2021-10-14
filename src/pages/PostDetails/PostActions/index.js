import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import InputComment from "../../../components/Comments/InputComment";
import CardActions from "../../../components/PostCards/CardFooter/CardActions";
import { LIKES_USERS_TYPES } from "../../../redux/types/likedUsersTypes";
import "./index.scss";
const PostActions = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="posts-footer">
        <div className="posts-footer-actions">
          <CardActions post={post} />
        </div>
        <div className="posts-footer-input">
          <div
            className="posts-footer-likes"
            onClick={() =>
              dispatch({ type: LIKES_USERS_TYPES.IS_SHOW, payload: post.likes })
            }
          >
            {post.likes.length} likes
          </div>
          <div className="posts-footer-createdAt">
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
          <InputComment post={post} />
        </div>
      </div>
    </>
  );
};

export default PostActions;
