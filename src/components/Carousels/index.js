import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
const Carousels = ({ images, id }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="carousels-container">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div className="carousels-container-img" key={index}>
              {img.url.match(/video/i) ? (
                <video controls src={img.url} alt="Img" />
              ) : (
                <img src={img.url} alt="Img" />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousels;
