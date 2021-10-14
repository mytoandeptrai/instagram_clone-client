import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { NEW_TYPES } from "../types/newTypes";
import { NOTIFY_TYPES } from "../types/notifyTypes";

export const createNewsNotify = ({ msg, auth, socket }) => {
  return async (dispatch) => {
    try {
      const res = await postDataAPI("notify", msg, auth.token);
      socket.emit("createNotify", {
        ...res.data.notify,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
          _id: auth.user._id,
        },
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const removeNewsNotify = ({ msg, auth, socket }) => {
  return async (dispatch) => {
    try {
      const res = await deleteDataAPI(
        `notify/${msg.id}?url=${msg.url}`,
        auth.token
      );

      socket.emit("removeNotify", msg);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getNewsNotifies = (token) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI("notifies", token);
      dispatch({
        type: NEW_TYPES.GET_NOTIFIES,
        payload: res.data.notifies,
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const isReadNotify = ({ msg, auth }) => {
  return async (dispatch) => {
    dispatch({
      type: NEW_TYPES.UPDATE_NOTIFY,
      payload: { ...msg, isRead: true },
    });

    try {
      await patchDataAPI(`/isReadNotify/${msg._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const deleteAllNotifies = (token) => {
  return async (dispatch) => {
    dispatch({
      type: NEW_TYPES.DELETE_ALL_NOTIFIES,
      payload: [],
    });

    try {
      await deleteDataAPI("deleteAllNotifies", token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};
