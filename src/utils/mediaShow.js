export const imageShow = (src) => {
  return (
    <img
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      src={src}
      alt="Img"
      className="img-thumbnail"
    />
  );
};
export const videoShow = (src) => {
  return (
    <video
      controls
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      src={src}
      alt="Img"
      className="img-thumbnail"
    />
  );
};
