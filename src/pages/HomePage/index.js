import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Status from "../../components/Status";
import Posts from "../../layouts/Posts";
import "./index.scss";
import LoadingIcon from "../../assets/images/loading.gif";
import RightSideBar from "../../layouts/RightSideBar";

let scroll = 0;

const HomePage = () => {
  const { homePosts } = useSelector((state) => state);

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <>
      <div className="homepage">
        <div className="homepage-container">
          <div className="homepage-contents">
            <Status />
            {homePosts.loading ? (
              <>
                <img
                  src={LoadingIcon}
                  alt="Loading"
                  className="homepage-contents-loading"
                />
              </>
            ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
              <h2 className="homepage-contents-heading">No Post</h2>
            ) : (
              <>
                <Posts />{" "}
              </>
            )}
          </div>

          <div className="homepage-suggestions">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
