import React, { useEffect, useRef, useState } from "react";
import PostThumb from "../../components/PostProfile/PostThumb";
import LoadingIcon from "../../assets/images/loading.gif";
import "./index.scss";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/types/profileTypes";
import { getMoreUserPosts } from "../../redux/actions/profileActions";
const PostProfiles = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const pageEnd = useRef();

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 9}`,
      auth.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({
      type: PROFILE_TYPES.UPDATE_POST,
      payload: newData,
    });
    setLoad(false);
  };

  //Loadmore

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setPage((p) => p + 1);
  //       }
  //     },
  //     {
  //       threshold: 0.1,
  //     }
  //   );

  //   observer.observe(pageEnd.current);
  // }, [setPage]);

  // useEffect(() => {
  //   if (result >= 9 * (page - 1) && page > 1) {
  //     setLoad(true);
  //     dispatch(getMoreUserPosts({ id, page, auth }));
  //     setLoad(false);
  //   } else {
  //     return;
  //   }
  // }, [auth, dispatch, result, page, id]);

  return (
    <>
      <div className="post-profile-container">
        <PostThumb posts={posts} result={result} />
        {load && (
          <div className="post-profile-loading">
            <img src={LoadingIcon} alt="Logo" />
          </div>
        )}
        {/* <button className="post-profile-loadMore" ref={pageEnd}>
          Loadmore
        </button> */}
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
  );
};

export default PostProfiles;
