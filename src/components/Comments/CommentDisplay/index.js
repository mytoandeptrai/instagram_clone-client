import React, { useState } from "react";
import CommentCard from "../CommentCard";
import "./index.scss";
const CommentDisplay = ({ comment, post, replyCm, handleCheck }) => {
  const [showReply, setShowReply] = useState(false);
  return (
    <div className="comment-display">
      <CommentCard
        comment={comment}
        post={post}
        commentId={comment._id}
        handleCheck={handleCheck}
      >
        {handleCheck === false && (
          <div className="comment-display-reply">
            {replyCm.length > 0 && (
              <span
                className="comment-display-line"
                onClick={() => setShowReply(!showReply)}
              >
                {showReply ? `Hide reply` : `View reply `}
              </span>
            )}

            {replyCm.map(
              (item, index) =>
                item.reply && (
                  <>
                    {showReply && (
                      <div className="comment-display-details">
                        <CommentCard
                          key={index}
                          comment={item}
                          post={post}
                          commentId={comment._id}
                        />
                      </div>
                    )}
                  </>
                )
            )}
          </div>
        )}
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
