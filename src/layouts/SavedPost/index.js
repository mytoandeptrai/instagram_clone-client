import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import PostThumb from "../../components/PostProfile/PostThumb";
import LoadingIcon from "../../assets/images/loading.gif";
import "./index.scss";
import { getDataAPI } from "../../utils/fetchData";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
const SavedPost = ({ auth, dispatch }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI("getSavePost", auth.token)
      .then((res) => {
        setSavedPosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: NOTIFY_TYPES.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      });
    return () => setSavedPosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePost?limit=${page * 9}`, auth.token);
    setSavedPosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <>
      <div className="savedPost-container">
        {auth.user.saved.length === 0 ? (
          <>
            <div className="savedPost-warning">
              <div className="savedPost-heading">
                <h4>Only you can see what you're saved</h4>
                <Link to="/" className="savePost-link">
                  New Collection
                </Link>
              </div>
              <div className="savedPost-contents">
                <div className="savedPost-logo">
                  <i className="far fa-bookmark"></i>
                </div>
                <h3>Save</h3>
                <span>
                  Save photos and videos that you want to see again. No one is
                  notified, and only you can see what you've saved.
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="post-profile-container">
              <PostThumb posts={savedPosts} result={result} />
              {load && (
                <div className="post-profile-loading">
                  <img src={LoadingIcon} alt="Logo" />
                </div>
              )}
              <div className="post-profile-btn">
                <LoadMoreBtn
                  result={result}
                  page={page}
                  load={load}
                  handleLoadMore={handleLoadMore}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SavedPost;
