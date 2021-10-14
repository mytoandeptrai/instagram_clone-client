import React, { useState } from "react";
import Comments from "../../../Comments/index";
import InputComment from "../../../Comments/InputComment";
import "./index.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import { LIKES_USERS_TYPES } from "../../../../redux/types/likedUsersTypes";
const CardComments = ({ post, handleCheck }) => {
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className="card-comments-container">
        <div className="card-comments-contents">
          <div
            className="card-comments-likes"
            onClick={() =>
              dispatch({ type: LIKES_USERS_TYPES.IS_SHOW, payload: post.likes })
            }
          >
            {post.likes.length} likes
          </div>
          <div className="card-comments-heading">
            <span className="card-comments-author">{post.user.username}</span>{" "}
            <span>
              {post.content.length < 60
                ? post.content
                : readMore
                ? post.content + " "
                : post.content.slice(0, 30) + "....."}
            </span>
            {post.content.length > 60 && (
              <span
                className="card-comments-readMore"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "hide" : "more"}
              </span>
            )}
          </div>
          <div className="card-comments-details">
            <Comments post={post} handleCheck={handleCheck} />
          </div>
          <div className="card-comments-createdAt">
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
          <div className="card-comments-input">
            <InputComment post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComments;
