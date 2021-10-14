import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePosts from "./postReducer";
import modal from "./modalReducer";
import detailPost from "./detailPostReducer";
import discover from "./discoverReducer";
import suggestions from "./suggestionsReducer";
import socket from "./socketReducer";
import news from "./newsReducer";
import message from "./messageReducer";
import online from "./onlineReducer";
import input from "./inputReducer";
import call from "./callReducer";
import peer from "./peerReducer";
import postModal from "./postModalReducer";
import likedUsers from "./likedUsersReducer";

export default combineReducers({
  auth,
  notify,
  profile,
  status,
  homePosts,
  modal,
  input,
  detailPost,
  discover,
  suggestions,
  socket,
  news,
  message,
  online,
  call,
  peer,
  postModal,
  likedUsers,
});
