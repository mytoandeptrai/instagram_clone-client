import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PostActions from "../../pages/PostDetails/PostActions";
import PostList from "../../pages/PostDetails/PostList";
import { POSTMODAL_TYPES } from "../../redux/types/postModalTypes";
import Carousels from "../Carousels";
import CardHeader from "../PostCards/CardHeader";
import "./index.scss";
const PostModal = () => {
  const { postModal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: POSTMODAL_TYPES.ISMODAL,
      payload: false,
    });
  };
  return (
    <>
      <div className="post-modal">
        <div className="post-modal-container">
          <div className="post-modal-btn" onClick={closeModal}>
            &times;
          </div>
          <div className="post-modal-details">
            <div className="post-modal-images">
              <Carousels images={postModal.images} />
            </div>
            <div className="post-modal-comments">
              <CardHeader post={postModal} handleCheck={false} />
              <PostList post={postModal} handleCheck={false} />
              <PostActions post={postModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
