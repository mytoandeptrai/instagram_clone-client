import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";
import { deleteData } from "../types/globalTypes";
import { MESSAGE_TYPES } from "../types/messageTypes";
import { NOTIFY_TYPES } from "../types/notifyTypes";

export const addUserAction = ({ user, message }) => {
  return async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({
        type: MESSAGE_TYPES.ADD_USER,
        payload: user,
      });
    }
  };
};

export const addMessageAction = ({ msg, auth, socket }) => {
  return async (dispatch) => {
    dispatch({
      type: MESSAGE_TYPES.ADD_MESSAGE,
      payload: msg,
    });

    const { _id, avatar, fullname, username } = auth.user;

    socket.emit("addMessage", {
      ...msg,
      user: { _id, avatar, fullname, username },
    });

    try {
      await postDataAPI("message", msg, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getConversations = ({ auth, page = 1 }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(
        `conversations?limit=${page * 9}`,
        auth.token
      );
      let newArr = [];

      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              media: item.media,
              call: item.call,
            });
          }
        });
      });

      dispatch({
        type: MESSAGE_TYPES.GET_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getMessagesAction = ({ auth, id, page = 1 }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );

      const newData = { ...res.data, messages: res.data.messages.reverse() };

      dispatch({
        type: MESSAGE_TYPES.GET_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const getMoreMessagesAction = ({ auth, id, page = 1 }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };

      dispatch({
        type: MESSAGE_TYPES.UPDATE_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const deleteMessageAction = ({ msg, data, auth }) => {
  return async (dispatch) => {
    const newData = deleteData(data, msg._id);

    dispatch({
      type: MESSAGE_TYPES.DELETE_MESSAGES,
      payload: { newData, _id: msg.recipient },
    });

    try {
      await deleteDataAPI(`message/${msg._id}`, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const deleteConversationAction = ({ auth, id }) => {
  return async (dispatch) => {
    dispatch({
      type: MESSAGE_TYPES.DELETE_CONVERSATION,
      payload: id,
    });

    try {
      await deleteDataAPI(`conversation/${id}`, auth.token);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};
