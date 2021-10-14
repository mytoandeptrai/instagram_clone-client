import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createCommentAction } from "../../../redux/actions/commentActions";
import { STATUS_TYPES } from "../../../redux/types/statusTypes";
import Icons from "../../Icons";
import "./index.scss";
const InputComment = ({ children, post, onReply, setOnReply }) => {
  const { auth, socket, input, postModal } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    const newComments = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    let newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: undefined,
      tag: undefined,
    };

    if (input.isReply) {
      newComment = {
        ...newComment,
        reply: input.commentId,
        tag: input.user,
      };
      dispatch(
        createCommentAction({ post, newComment, auth, socket, postModal })
      );
    } else {
      dispatch(
        createCommentAction({ post, newComment, auth, socket, postModal })
      );
    }
    dispatch({
      type: STATUS_TYPES.ON_REPLY,
      payload: false,
    });
    if (setOnReply) return setOnReply(false);

    setContent("");
  };

  return (
    <>
      <div className="input-comments">
        <form className="input-form" onSubmit={handleSubmit}>
          {children}
          {input.isReply && (
            <Link to={`/profile/${input.user._id}`} className="input-tag">
              @{input.user.username}{" "}
            </Link>
          )}
          <input
            type="text"
            className="input-comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
          />

          <div className="input-icons">
            <Icons setContent={setContent} content={content} />
          </div>

          <button
            type="submit"
            className="input-btn"
            disabled={content ? false : true}
            style={{ opacity: content ? 1 : 0.5 }}
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default InputComment;
