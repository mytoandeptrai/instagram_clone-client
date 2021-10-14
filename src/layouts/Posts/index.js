import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import CardBody from "../../components/PostCards/CardBody";
import CardFooter from "../../components/PostCards/CardFooter";
import CardHeader from "../../components/PostCards/CardHeader";
import LoadingIcon from "../../assets/images/loading.gif";
import "./index.scss";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/types/postTypes";
import { getMorePosts } from "../../redux/actions/postActions";
const Posts = () => {
  const { homePosts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const pageEnd = useRef();
  const [page, setPage] = useState(1);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  };

  //Load more

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
    if (homePosts.result >= 9 * (page - 1) && page > 1) {
      setLoad(true);
      dispatch(getMorePosts({ auth, page }));
      setLoad(false);
    } else {
      return;
    }
  }, [auth, dispatch, homePosts.result, page]);

  return (
    <>
      <div className="posts-container">
        {homePosts.posts.map((post, index) => (
          <div key={post._id} className="posts-content">
            <CardHeader post={post} handleCheck={true} />
            <CardBody post={post} />
            <CardFooter post={post} handleCheck={true} />
          </div>
        ))}

        {load && (
          <div className="posts-loading">
            <img src={LoadingIcon} alt="Logo" />
          </div>
        )}

        {/* <div className="discover-page-btn">
          <LoadMoreBtn
            result={homePosts.result}
            page={homePosts.page}
            load={load}
            handleLoadMore={handleLoadMore}
          />
        </div> */}
        <button className="posts-loadMore" ref={pageEnd}>
          LoadMore
        </button>
      </div>
    </>
  );
};

export default Posts;
