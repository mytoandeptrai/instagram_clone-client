import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import LoadingIcon from "../../assets/images/loading.gif";
import Carousels from "../../components/Carousels";
import CardHeader from "../../components/PostCards/CardHeader";
import { getPostDetail } from "../../redux/actions/postActions";
import "./index.scss";
import PostActions from "./PostActions";
import PostList from "./PostList";
import PostRelated from "./PostRelated";
const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, detailPost } = useSelector((state) => state);
  const [post, setPost] = useState([]);

  useEffect(() => {
    dispatch(getPostDetail({ detailPost, id, auth }));

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr);
    }
  }, [auth, detailPost, id, dispatch]);

  return (
    <>
      <div className="post-detail-container">
        {post.length === 0 && (
          <img
            src={LoadingIcon}
            alt="Loading"
            className="post-detail-loading"
          />
        )}
        {post.map((item) => (
          <>
            <div className="post-detail-content" key={item._id}>
              <div className="post-detail-img">
                <Carousels images={item.images} />
              </div>
              <div className="post-detail-comments">
                <CardHeader post={item} handleCheck={false} />
                <PostList post={item} handleCheck={false} />
                <PostActions post={item} />
                {/* <CardFooter post={item} handleCheck={false} /> */}
              </div>
            </div>
            <div className="post-detail-related">
              <PostRelated post={item} auth={auth} />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default PostDetails;
