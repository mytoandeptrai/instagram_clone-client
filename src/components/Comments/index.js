import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { POSTMODAL_TYPES } from "../../redux/types/postModalTypes";
import CommentDisplay from "./CommentDisplay";
import "./index.scss";
const Comments = ({ post, handleCheck }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);
  const [next, setNext] = useState(2);
  const dispatch = useDispatch();
  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post.comments]);

  return (
    <>
      <div className="comment-container">
        {/* {comments.length - next > 0 ? (
          <div className="comment-show" onClick={() => setNext(next + 5)}>
            See more comments...
          </div>
        ) : (
          comments.length > 2 && (
            <div className="comment-show" onClick={() => setNext(2)}>
              Hide comments...
            </div>
          )
        )} */}
        {comments.length > 0 && (
          <p
            className="comment-show"
            onClick={() =>
              dispatch({ type: POSTMODAL_TYPES.ISMODAL, payload: post })
            }
          >
            {`View ${comments.length} comments`}
          </p>
        )}

        {comments.map((comment, index) => (
          <CommentDisplay
            handleCheck={handleCheck}
            key={index}
            comment={comment}
            post={post}
            replyCm={replyComments.filter((item) => item.reply === comment._id)}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
