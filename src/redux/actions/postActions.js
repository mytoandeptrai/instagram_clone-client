import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { AUTH_TYPES } from "../types/authTypes";
import { deleteData, editData } from "../types/globalTypes";
import { NOTIFY_TYPES } from "../types/notifyTypes";
import { POST_TYPES } from "../types/postTypes";
import { createNewsNotify, removeNewsNotify } from "./newsActions";

export const createPostAction = ({ content, images, auth, socket }) => {
  return async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: true } });
      if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        "posts",
        { content, images: media },
        auth.token
      );
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: false } });

      //Notify

      const msg = {
        id: res.data.newPost._id,
        text: "Added a new post.",
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        content,
        image: media[0].url,
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

export const updatePostAction = ({ content, images, auth, status }) => {
  return async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    )
      return;

    try {
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: true } });
      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

      const res = await patchDataAPI(
        `post/${status._id}`,
        {
          content,
          images: [...imgOldUrl, ...media],
        },
        auth.token
      );

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.newPost,
      });

      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getPosts = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
      const res = await getDataAPI("posts", token);
      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: { ...res.data, page: 2 },
      });
      dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getMorePosts = ({ auth, page }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(`posts?limit=${page * 9}`, auth.token);
      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: { ...res.data },
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const likePostAction = ({ post, auth, socket }) => {
  return async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    socket.emit("likePost", newPost);
    try {
      const res = await patchDataAPI(`post/${post._id}/like`, null, auth.token);
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: res.data.msg,
      });

      //Notify

      const msg = {
        id: auth.user._id,
        text: "liked your post.",
        recipients: [post.user._id],
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

export const unLikePostAction = ({ post, auth, socket }) => {
  return async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });
    socket.emit("unLikePost", newPost);

    try {
      const res = await patchDataAPI(
        `post/${post._id}/unlike`,
        null,
        auth.token
      );
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: res.data.msg,
      });

      //Notify

      const msg = {
        id: auth.user._id,
        text: "liked your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };

      dispatch(removeNewsNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getPostDetail = ({ detailPost, id, auth }) => {
  return async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch({
          type: POST_TYPES.GET_POST,
          payload: res.data.post,
        });
      } catch (err) {
        dispatch({
          type: NOTIFY_TYPES.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };
};

export const deletePostAction = ({ post, auth, socket }) => {
  return async (dispatch) => {
    dispatch({
      type: POST_TYPES.DELETE_POST,
      payload: post,
    });

    try {
      const res = await deleteDataAPI(`post/${post._id}`, auth.token);

      //Notify

      const msg = {
        id: post._id,
        text: "Added a new post.",
        recipients: res.data.newPost.user.followers,
        url: `/post/${post._id}`,
      };

      dispatch(removeNewsNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const savePostAction = ({ post, auth }) => {
  return async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: { ...auth, user: newUser },
    });

    try {
      await patchDataAPI(`savePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const unSavePostAction = ({ post, auth }) => {
  return async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    };

    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: { ...auth, user: newUser },
    });

    try {
      await patchDataAPI(`unSavePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getRelatedPostAction = ({ post, auth }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(
        `user_posts/${post.user._id}?limit=7`,
        auth.token
      );
      const relatedPost = deleteData(res.data.posts, post._id);
      dispatch({
        type: POST_TYPES.GET_RELATED_POSTS,
        payload: relatedPost,
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};
