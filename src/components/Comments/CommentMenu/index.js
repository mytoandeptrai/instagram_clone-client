import React, { useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES } from "../../../redux/types/modalTypes";
import { deleteCommentAction } from "../../../redux/actions/commentActions";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const { auth, socket, postModal } = useSelector((state) => state);
  const handleShowActions = () => {
    setIsShow(true);
    dispatch({
      type: MODAL_TYPES.MODAL,
      payload: true,
    });
  };

  const handleOnEdit = () => {
    setOnEdit(true);
    setIsShow(false);
    dispatch({
      type: MODAL_TYPES.MODAL,
      payload: false,
    });
  };

  const handleUnShowActions = () => {
    setIsShow(false);
    dispatch({
      type: MODAL_TYPES.MODAL,
      payload: false,
    });
  };

  const handleRemove = () => {
    setIsShow(false);
    dispatch({
      type: MODAL_TYPES.MODAL,
      payload: false,
    });
    dispatch(deleteCommentAction({ post, auth, comment, socket, postModal }));
  };

  return (
    <>
      <div className="comment-menu">
        {(post.user._id === auth.user._id ||
          comment.user._id === auth.user._id) && (
          <div className="comment-menu-dropdown">
            <span className="material-icons dark" onClick={handleShowActions}>
              more_horiz
            </span>
            {isShow && (
              <>
                <div className="comment-menu-modal">
                  <div className="comment-menu-list">
                    <div className="comment-menu-items" onClick={handleOnEdit}>
                      <span className="comment-menu-actions red">Edit</span>
                    </div>
                    <div className="comment-menu-items" onClick={handleRemove}>
                      <span className="comment-menu-actions red">Delete</span>
                    </div>
                    <div
                      className="comment-menu-items"
                      onClick={handleUnShowActions}
                    >
                      <span className="comment-menu-actions">Cancel</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentMenu;
