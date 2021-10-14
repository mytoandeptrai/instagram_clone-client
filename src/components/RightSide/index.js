import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import LoadingIcon from "../../assets/images/loading.gif";
import {
  addMessageAction,
  deleteConversationAction,
  getMessagesAction,
  getMoreMessagesAction,
} from "../../redux/actions/messageActions";
import { MESSAGE_TYPES } from "../../redux/types/messageTypes";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
import { imageUpload } from "../../utils/imageUpload";
import { imageShow, videoShow } from "../../utils/mediaShow";
import UserCard from "../UserCard";
import "./index.scss";
import MsgDisplay from "./MsgDisplay";
import axios from "axios";
import { getDataAPI } from "../../utils/fetchData";
import { CALL_TYPES } from "../../redux/types/callTypes";
const RightSide = () => {
  const { auth, message, socket, peer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();

  const [isDetail, setIsDetail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAudio, setIsAudio] = useState(false);

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [message.data, id]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setIsDetail(false);
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);

      const newUser = message.users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];
    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "This image/video larget is 5mb");
      }

      return newMedia.push(file);
    });

    if (err)
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err },
      });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    
    setLoadMedia(false);
    await dispatch(addMessageAction({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const handleDeleteConversation = () => {
    dispatch(deleteConversationAction({ auth, id }));
    return history.push("/message");
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessagesAction({ auth, id }));
        setIsDetail(false);
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, auth, dispatch, message.data]);

  //Load more

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(getMoreMessagesAction({ auth, id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
  }, [auth, dispatch, id, page, result, isLoadMore]);

  //Call

  const caller = ({ video }) => {
    const { _id, avatar, username, fullname } = user;
    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullname,
      video,
    };
    dispatch({
      type: CALL_TYPES.CALL,
      payload: msg,
    });
  };

  const callUser = ({ video }) => {
    const { _id, avatar, username, fullname } = auth.user;
    const msg = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      fullname,
      video,
    };

    if (peer.open) msg.peerId = peer._id;

    socket.emit("callUser", msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  return (
    <>
      <div className="message-header">
        <div className="message-heading">
          {user.length !== 0 && (
            <UserCard user={user} msg={true}>
              <div className="message-heading-actions">
                <i
                  className="fas fa-phone-alt message-heading-phone"
                  onClick={handleAudioCall}
                ></i>
                <i
                  className="fas fa-video message-heading-video"
                  onClick={handleVideoCall}
                ></i>
                <i
                  className="fas fa-info-circle"
                  style={{ color: isDetail ? "" : "darkgray" }}
                  onClick={() => setIsDetail(!isDetail)}
                ></i>
              </div>
            </UserCard>
          )}
        </div>

        {isDetail ? (
          <>
            <div className="message-details">
              <div className="message-details-member">
                <h3 className="message-details-owner">Members</h3>
                {user.length !== 0 && <UserCard user={user} />}
              </div>
              <div className="message-details-actions">
                <button
                  className="message-details-btn"
                  onClick={handleDeleteConversation}
                >
                  Delete Chat
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="message-chat"
              style={{
                height:
                  media.length > 0
                    ? "calc(100% - 186px)"
                    : "calc(100% - 116px)",
              }}
            >
              <div className="message-chat-display" ref={refDisplay}>
                <button className="message-chat-btn" ref={pageEnd}>
                  LoadMore
                </button>
                {data.map((msg, index) => (
                  <div key={index}>
                    {msg.sender !== auth.user._id && (
                      <div className="message-chat-row other-message">
                        <MsgDisplay user={user} msg={msg} />
                      </div>
                    )}

                    {msg.sender === auth.user._id && (
                      <div className="message-chat-row you-message">
                        <MsgDisplay user={auth.user} msg={msg} data={data} />
                      </div>
                    )}
                  </div>
                ))}

                {loadMedia && (
                  <div className="message-chat-row you-message">
                    <img src={LoadingIcon} alt="Loading" />
                  </div>
                )}
              </div>
            </div>

            <div
              className="message-media"
              style={{ display: media.length > 0 ? "grid" : "none" }}
            >
              {media.map((item, index) => (
                <div key={index} className="message-media-list">
                  {item.type.match(/video/i)
                    ? videoShow(URL.createObjectURL(item))
                    : imageShow(URL.createObjectURL(item))}
                  <span
                    className="message-media-close"
                    onClick={() => handleDeleteMedia(index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>

            <form className="message-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="message-form-input"
                placeholder="Enter your message...."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <div className="message-form-upload">
                <i className="fas fa-image message-form-icon"></i>
                <input
                  type="file"
                  name="file"
                  className="message-form-file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleChangeMedia}
                />
              </div>

              <button
                type="submit"
                className="message-form-btn"
                // disabled={text || media.length > 0 ? false : true}
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default RightSide;
