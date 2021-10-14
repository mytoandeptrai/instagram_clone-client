import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAction,
  updatePostAction,
} from "../../../redux/actions/postActions";
import { NOTIFY_TYPES } from "../../../redux/types/notifyTypes";
import { STATUS_TYPES } from "../../../redux/types/statusTypes";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import Icons from "../../Icons";
import "./index.scss";
const StatusModal = () => {
  const { auth, status, socket } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const dispatch = useDispatch();
  const videoRef = useRef();
  const refCanvas = useRef();

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  const handleChangeImage = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];
    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "This image/video larget is 5mb");
      }

      return newImages.push(file);
    });

    if (err)
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();

    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: "Please add your photos!" },
      });

    if (status.onEdit) {
      dispatch(updatePostAction({ content, images, auth, status }));
    } else {
      dispatch(createPostAction({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({
      type: STATUS_TYPES.STATUS,
      payload: false,
    });
  };

  return (
    <>
      <div className="status-modal">
        <form action="#" className="status-form" onSubmit={handleSubmit}>
          <div className="status-heading">
            <h5>Create New Post</h5>
            <span
              onClick={() =>
                dispatch({
                  type: STATUS_TYPES.STATUS,
                  payload: false,
                })
              }
            >
              &times;
            </span>
          </div>

          <div className="status-content">
            <textarea
              name="content"
              placeholder={`${auth.user.username}, what are you thinking ?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="status-content-icons">
              <Icons setContent={setContent} content={content} />
            </div>

            <div className="status-content-showImg">
              {images.map((img, index) => (
                <div key={index} id="file_img">
                  {img.camera ? (
                    imageShow(img.camera)
                  ) : img.url ? (
                    <>
                      {img.url.match(/video/i)
                        ? videoShow(img.url)
                        : imageShow(img.url)}
                    </>
                  ) : (
                    <>
                      {img.type.match(/video/i)
                        ? videoShow(URL.createObjectURL(img))
                        : imageShow(URL.createObjectURL(img))}
                    </>
                  )}
                  <span onClick={() => deleteImages(index)}>&times;</span>
                </div>
              ))}
            </div>

            {stream && (
              <div className="status-content-stream">
                <video
                  autoPlay
                  muted
                  ref={videoRef}
                  width="100%"
                  height="100%"
                />
                <span onClick={handleStopStream}>&times;</span>
                <canvas ref={refCanvas} style={{ display: "none" }} />
              </div>
            )}

            <div className="status-content-images">
              {stream ? (
                <i className="fas fa-camera" onClick={handleCapture} />
              ) : (
                <>
                  <i className="fas fa-camera" onClick={handleStream} />
                  <div className="status-content-upload">
                    <i className="fas fa-image" />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleChangeImage}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="status-footer">
              <button className="status-footer-btn" type="submit">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StatusModal;
