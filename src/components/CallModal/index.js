import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageAction } from "../../redux/actions/messageActions";
import { CALL_TYPES } from "../../redux/types/callTypes";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
import ProfileIcon from "../ProfileIcon";
import "./index.scss";
const CallModal = () => {
  const { call, auth, peer, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);

  const [answer, setAnswer] = useState(false);
  const youVideo = useRef();
  const otherVideo = useRef();
  const [tracks, setTracks] = useState(null);

  //Set Time

  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();
    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  const addCallMessage = useCallback(
    (call, times, disconnect) => {
      if (call.recipient !== auth.user._id || disconnect) {
        const msg = {
          sender: call.sender,
          recipient: call.recipient,
          text: "",
          media: [],
          call: {
            video: call.video,
            times,
          },
          createdAt: new Date().toISOString(),
        };
        dispatch(addMessageAction({ msg, auth, socket }));
      }
    },
    [auth, dispatch, socket]
  );

  const handleEndCall = () => {
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    let times = answer ? total : 0;
    socket.emit("endCall", { ...call, times });

    addCallMessage(call, times);

    dispatch({
      type: CALL_TYPES.CALL,
      payload: null,
    });
  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit("endCall", { ...call, times: 0 });
        addCallMessage(call, 0);

        dispatch({
          type: CALL_TYPES.CALL,
          payload: null,
        });
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    socket.on("endCallToClient", (data) => {
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      addCallMessage(data, data.times);
      dispatch({
        type: CALL_TYPES.CALL,
        payload: null,
      });
    });

    return () => socket.off("endCallToClient");
  }, [socket, dispatch, tracks, addCallMessage, call]);

  //Stream media
  const openStream = (video) => {
    const config = { audio: true, video };
    return navigator.mediaDevices.getUserMedia(config);
  };

  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on("stream", function (remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });

      setAnswer(true);
    });
  };

  useEffect(() => {
    peer.on("call", (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }

        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);

        newCall.on("stream", function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });

        setAnswer(true);
      });
    });

    return () => peer.removeListener("call");
  }, [call.video, peer]);

  //disconnect
  useEffect(() => {
    socket.on("callerDisconnect", () => {
      tracks && tracks.forEach((track) => track.stop());

      console.log("user disconnect");

      let times = answer ? total : 0;
      addCallMessage(call, times, true);

      dispatch({
        type: CALL_TYPES.CALL,
        payload: null,
      });

      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: `${call.username} disconnect` },
      });
    });

    return () => socket.off("callerDisconnect");
  }, [socket, tracks, dispatch, addCallMessage, total, call, answer]);

  return (
    <>
      <div className="call-modal">
        <div
          className="call-box"
          style={{ display: answer && call.video ? "none" : "flex" }}
        >
          <div className="call-box-content">
            <ProfileIcon src={call.avatar} size="supper-avatar" />
            <div className="call-box-users">
              <h4>{call.username}</h4>
              <h6>{call.fullname}</h6>
            </div>

            {answer ? (
              <div className="call-box-time">
                <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
                <span>:</span>
                <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
                <span>:</span>
                <span>
                  {second.toString().length < 2 ? "0" + second : second}
                </span>
              </div>
            ) : (
              <div className="call-box-desc">
                {call.video ? (
                  <span>calling video...</span>
                ) : (
                  <span>calling audio....</span>
                )}
              </div>
            )}
          </div>

          {!answer && (
            <div className="call-box-timer">
              <small>{mins.toString().length < 2 ? "0" + mins : mins}</small>
              <small>:</small>
              <small>
                {second.toString().length < 2 ? "0" + second : second}
              </small>
            </div>
          )}

          <div className="call-box-actions">
            <span
              className="material-icons call-box-cancel"
              onClick={handleEndCall}
            >
              call_end
            </span>

            {call.recipient === auth.user._id && !answer && (
              <>
                {call.video ? (
                  <span
                    className="material-icons call-box-video"
                    onClick={handleAnswer}
                  >
                    videocam
                  </span>
                ) : (
                  <span
                    className="material-icons call-box-phone"
                    onClick={handleAnswer}
                  >
                    call
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div
          className="call-box-showVideo"
          style={{ opacity: answer && call.video ? "1" : "0" }}
        >
          <video src="#" className="call-box-youVideo" ref={youVideo}></video>
          <video
            src=""
            className="call-box-otherVideo"
            ref={otherVideo}
          ></video>

          <div className="call-box-timeVideo">
            <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
            <span>:</span>
            <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
            <span>:</span>
            <span>{second.toString().length < 2 ? "0" + second : second}</span>
          </div>

          <span
            className="material-icons call-box-cancel call-box-endCall"
            onClick={handleEndCall}
          >
            call_end
          </span>
        </div>
      </div>
    </>
  );
};

export default CallModal;
