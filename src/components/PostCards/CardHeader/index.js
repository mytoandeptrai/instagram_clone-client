import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deletePostAction } from "../../../redux/actions/postActions";
import { STATUS_TYPES } from "../../../redux/types/statusTypes";
import { BASE_URL } from "../../../utils/config";
import ProfileIcon from "../../ProfileIcon";
import swal from "sweetalert";
import "./index.scss";
const CardHeader = ({ post, handleCheck }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  const handleEditPost = () => {
    dispatch({ type: STATUS_TYPES.STATUS, payload: { ...post, onEdit: true } });
    setIsShow(false);
  };

  const handleShowActions = () => {
    setIsShow(true);
    // dispatch({
    //   type: MODAL_TYPES.MODAL,
    //   payload: true,
    // });
  };

  const handleUnShowActions = () => {
    setIsShow(false);
    // dispatch({
    //   type: MODAL_TYPES.MODAL,
    //   payload: false,
    // });
  };

  const handleDeletePost = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to remove this post?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePostAction({ post, auth, socket }));
      }
    });
    setIsShow(false);
    return history.push("/");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    handleUnShowActions();
  };

  return (
    <>
      <div className="card-header">
        <div className="card-header-content">
          <div className="card-header-img">
            <ProfileIcon src={post.user.avatar} size="big-avatar" />
          </div>

          <div className="card-header-name">
            <h6>
              <Link to={`/profile/${post.user._id}`}>{post.user.username}</Link>
            </h6>
            {handleCheck && <small>{moment(post.createdAt).fromNow()}</small>}
          </div>

          <div className="card-header-dropdown" onClick={handleShowActions}>
            <span className="material-icons">more_horiz</span>
          </div>

          {isShow && (
            <div className="card-header-modal">
              <div className="card-header-menu">
                {auth.user._id === post.user._id && (
                  <>
                    <div className="card-header-items">
                      <span
                        className="card-header-actions red"
                        onClick={handleEditPost}
                      >
                        Edit Post
                      </span>
                    </div>
                    <div
                      className="card-header-items"
                      onClick={handleDeletePost}
                    >
                      <span className="card-header-actions red">
                        Delete Post
                      </span>
                    </div>
                    <div
                      className="card-header-items"
                      onClick={handleUnShowActions}
                    >
                      <span className="card-header-actions">Cancel</span>
                    </div>
                  </>
                )}
                <div className="card-header-items" onClick={handleCopyLink}>
                  <span className="card-header-actions">Copy Link</span>
                </div>
                <div
                  className="card-header-items"
                  onClick={handleUnShowActions}
                >
                  <span className="card-header-actions">Cancel</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardHeader;
