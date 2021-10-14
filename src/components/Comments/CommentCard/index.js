import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  likeCommentAction,
  unLikeCommentAction,
  updateCommentAction,
} from "../../../redux/actions/commentActions";
import { STATUS_TYPES } from "../../../redux/types/statusTypes";
import LikeButton from "../../LikeButton";
import CommentMenu from "../CommentMenu";
import "./index.scss";

const CommentCard = ({ children, comment, post, commentId, handleCheck }) => {
  const { auth, input, postModal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment.content, auth.user._id, comment.likes]);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeCommentAction({ comment, post, auth, postModal }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeCommentAction({ comment, post, auth, postModal }));
    setLoadLike(false);
  };

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateCommentAction({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);

    dispatch({
      type: STATUS_TYPES.ON_REPLY,
      payload: {
        ...comment,
        commentId,
        isReply: true,
      },
    });
    setOnReply({ ...comment, commentId });
  };

  const handleCancelReply = () => {
    return dispatch({
      type: STATUS_TYPES.ON_REPLY,
      payload: false,
    });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment-card" style={styleCard}>
      <div className="comment-card-container">
        <div className="comment-card-left">
          <div className="comment-card-heading">
            <Link
              className="comment-card-author"
              to={`/profile/${comment.user._id}`}
            >
              <span>{comment.user.username}</span>
            </Link>
            {/* <small>{moment(comment.createdAt).fromNow()}</small> */}
          </div>

          <div className="comment-card-details">
            <div className="comment-card-content">
              <div className="comment-card-text">
                {onEdit ? (
                  <textarea
                    cols="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                ) : (
                  <>
                    {comment.tag && comment.tag._id !== comment.user._id && (
                      <Link
                        to={`/profile/${comment.tag._id}`}
                        className="comment-card-tag"
                      >
                        @{comment.tag.username}{" "}
                      </Link>
                    )}
                    <span>
                      {content.length < 100
                        ? content
                        : readMore
                        ? content + " "
                        : content.slice(0, 30) + "...."}
                    </span>
                    {content.length > 100 && (
                      <span
                        className="comment-card-readMore"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Hide content" : "Read More"}
                      </span>
                    )}{" "}
                  </>
                )}
              </div>
              <div className="comment-card-actions">
                {onEdit ? (
                  <>
                    <small className="bold" onClick={handleUpdate}>
                      update
                    </small>
                    <small className="bold" onClick={(e) => setOnEdit(false)}>
                      cancel
                    </small>
                  </>
                ) : (
                  handleCheck === false && (
                    <>
                      {input.commentId === commentId && input.isReply ? (
                        <small className="bold" onClick={handleCancelReply}>
                          cancel
                        </small>
                      ) : (
                        <small className="bold" onClick={handleReply}>
                          reply
                        </small>
                      )}
                    </>
                  )
                )}
              </div>
            </div>
            {/* {onReply && (
              <InputComment
                post={post}
                onReply={onReply}
                setOnReply={setOnReply}
              >
                <Link
                  to={`/profile/${onReply.user._id}`}
                  className="comment-card-reply"
                >
                  @{onReply.user.username}:
                </Link>
              </InputComment>
            )} */}
          </div>
        </div>

        <div className="comment-card-likes" style={{ cursor: "pointer" }}>
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
            details={true}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CommentCard;
