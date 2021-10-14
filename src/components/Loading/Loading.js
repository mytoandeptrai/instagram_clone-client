import React from "react";
import Lottie from "react-lottie";
import animationData from "./700-circle-loading.json";
import "./Loading.scss";
export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loading loading-center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
