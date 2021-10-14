import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_TYPES } from "./redux/types/authTypes";
import { MESSAGE_TYPES } from "./redux/types/messageTypes";
import { NEW_TYPES } from "./redux/types/newTypes";
import { POST_TYPES } from "./redux/types/postTypes";
import { PEER_TYPES } from "./redux/types/peerTypes";
import { CALL_TYPES } from "./redux/types/callTypes";
import { NOTIFY_TYPES } from "./redux/types/notifyTypes";
const SocketClient = () => {
  const { auth, socket, online, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  //connect user to socket io
  useEffect(() => {
    socket.emit("joinUser", auth.user);
  }, [socket, auth.user]);

  //   likes
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  //  un likes
  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  //  Comments
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  // delete  Comments
  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  // FOllow
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: { ...auth, user: newUser },
      });
    });

    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  //UnFollow
  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: { ...auth, user: newUser },
      });
    });

    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  //create Notification
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      dispatch({
        type: NEW_TYPES.CREATE_NOTIFY,
        payload: msg,
      });
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch]);

  //remove Notification
  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      dispatch({
        type: NEW_TYPES.REMOVE_NOTIFY,
        payload: msg,
      });
    });

    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);

  //Message
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      dispatch({
        type: MESSAGE_TYPES.ADD_MESSAGE,
        payload: msg,
      });

      dispatch({
        type: MESSAGE_TYPES.ADD_USER,
        payload: { ...msg.user, text: msg.text, media: msg.media },
      });
    });

    return () => socket.off("addMessageToClient");
  }, [socket, dispatch]);

  // Check user Online/Offline
  // online

  useEffect(() => {
    socket.emit("checkUserOnline", auth.user);
  }, [socket, auth.user]);

  //Online to me
  useEffect(() => {
    socket.on("checkUserOnlineToMe", (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({
            type: AUTH_TYPES.ONLINE,
            payload: item.id,
          });
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);

  // online to client

  useEffect(() => {
    socket.on("checkUserOnlineToClient", (id) => {
      if (!online.includes(id)) {
        dispatch({
          type: AUTH_TYPES.ONLINE,
          payload: id,
        });
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  // Offline

  useEffect(() => {
    socket.on("CheckUserOffline", (id) => {
      dispatch({
        type: AUTH_TYPES.OFFLINE,
        payload: id,
      });
    });

    return () => socket.off("CheckUserOffline");
  }, [socket, dispatch, online]);

  // Call User

  useEffect(() => {
    socket.on("callUserToClient", (data) => {
      dispatch({
        type: CALL_TYPES.CALL,
        payload: data,
      });
    });

    return () => socket.off("callUserToClient");
  }, [socket, dispatch]);

  // USER BUSY
  useEffect(() => {
    socket.on("userBusy", (data) => {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: `${call.username} is busy` },
      });
    });

    return () => socket.off("userBusy");
  }, [socket, dispatch, call]);

  return <> </>;
};

export default SocketClient;
