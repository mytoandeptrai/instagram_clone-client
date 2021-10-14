import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Send from "../../../../assets/images/send.svg";
import LikeButton from "../../../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import {
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../../../redux/actions/postActions";
const CardActions = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    dispatch(likePostAction({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    dispatch(unLikePostAction({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePostAction({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePostAction({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <>
      <div className="card-actions-container">
        <div className="card-actions-menu">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/post/${post._id}`} className="card-actions-link">
            <i className="far fa-comment"></i>
          </Link>
          <img src={Send} alt="Send" className="card-actions-send" />
          {saved ? (
            <i
              className="fas fa-bookmark warning"
              onClick={handleUnSavePost}
            ></i>
          ) : (
            <i className="far fa-bookmark" onClick={handleSavePost}></i>
          )}
        </div>
      </div>
    </>
  );
};

export default CardActions;
