import {
  deleteDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { NOTIFY_TYPES } from "../types/notifyTypes";
import { POST_TYPES } from "../types/postTypes";
import { deleteData, editData } from "../types/globalTypes";
import { createNewsNotify, removeNewsNotify } from "./newsActions";
import { POSTMODAL_TYPES } from "../types/postModalTypes";
export const createCommentAction = ({
  post,
  newComment,
  auth,
  socket,
  postModal,
}) => {
  return async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataAPI("comment", data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

      if (postModal !== false)
        dispatch({ type: POSTMODAL_TYPES.ISMODAL, payload: newPost });

      socket.emit("createComment", newPost);

      // Notify
      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? "mentioned you in a comment."
          : "has commented on your post.",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNewsNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const updateCommentAction = ({ comment, post, content, auth }) => {
  return async (dispatch) => {
    const newComments = editData(post.comments, comment._id, {
      ...comment,
      content,
    });

    const newPost = { ...post, comments: newComments };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      await patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const likeCommentAction = ({ comment, post, auth, postModal }) => {
  return async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = editData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    if (postModal !== false)
      dispatch({ type: POSTMODAL_TYPES.ISMODAL, payload: newPost });

    try {
      await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const unLikeCommentAction = ({ comment, post, auth, postModal }) => {
  return async (dispatch) => {
    const newComment = {
      ...comment,
      likes: deleteData(comment.likes, auth.user._id),
    };
    const newComments = editData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    if (postModal !== false)
      dispatch({ type: POSTMODAL_TYPES.ISMODAL, payload: newPost });

    try {
      await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const deleteCommentAction = ({
  post,
  auth,
  comment,
  socket,
  postModal,
}) => {
  return async (dispatch) => {
    const deleteArr = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    if (postModal !== false)
      dispatch({ type: POSTMODAL_TYPES.ISMODAL, payload: newPost });

    socket.emit("deleteComment", newPost);
    try {
      deleteArr.forEach(async (item) => {
        await deleteDataAPI(`comment/${item._id}`, auth.token);

        // Notify
        const msg = {
          id: item._id,
          text: comment.reply
            ? "mentioned you in a comment."
            : "has commented on your post.",
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };

        dispatch(removeNewsNotify({ msg, auth, socket }));
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};
