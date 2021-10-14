import React from "react";
import "./index.scss";
const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load more
            </button>
          )}
    </>
  );
};

export default LoadMoreBtn;
