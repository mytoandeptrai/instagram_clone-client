import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiscoverPosts,
  getMorePostDiscover,
} from "../../redux/actions/discoverActions";
import LoadingIcon from "../../assets/images/loading.gif";
import "./index.scss";
import PostThumb from "../../components/PostProfile/PostThumb";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { DISCOVER_TYPES } from "../../redux/types/discoverTypes";
const DiscoverPage = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(0);
  const pageEnd = useRef();

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?num=${discover.page * 9}`,
      auth.token
    );
    dispatch({
      type: DISCOVER_TYPES.UPDATE_POST,
      payload: res.data,
    });
    setLoad(false);
  };

  //Loadmore

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (discover.result >= 9 * (page - 1) && page > 1) {
      setLoad(true);
      dispatch(getMorePostDiscover({ page, auth }));
      setLoad(false);
    } else {
      return;
    }
  }, [auth, dispatch, discover.result, page]);

  return (
    <>
      <div className="discover-page">
        <div className="discover-page-container">
          {discover.loading ? (
            <>
              <div className="discover-page-loading">
                <img src={LoadingIcon} alt="Logo" />
              </div>{" "}
            </>
          ) : (
            <>
              <div className="discover-page-details">
                <PostThumb posts={discover.posts} result={discover.result} />
              </div>
            </>
          )}

          {load && (
            <div className="discover-page-loading">
              <img src={LoadingIcon} alt="Logo" />
            </div>
          )}
          {/* <div className="discover-page-btn">
            {!discover.loading && (
              <LoadMoreBtn
                result={discover.result}
                page={discover.page}
                load={load}
                handleLoadMore={handleLoadMore}
              />
            )}
          </div> */}
          <button className="discover-page-loadMore" ref={pageEnd}>
            Loadmore
          </button>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
