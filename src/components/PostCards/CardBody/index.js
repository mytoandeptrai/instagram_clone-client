import React, { useState } from "react";
import Carousels from "../../Carousels";
import "./index.scss";
const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <div className="card-body">
        <div className="card-body-container">
          
          {post.images.length > 0 && (
            <Carousels images={post.images} id={post._id} />
          )}
        </div>
      </div>
    </>
  );
};

export default CardBody;
