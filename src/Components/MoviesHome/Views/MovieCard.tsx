import { memo } from "react";
import "../index.css";
function MovieCard(props: any) {
  const { uname, image } = props;

  if (!uname || !image) {
    return null;
  }

  return (
    <div className="movie-container">
      <img className="movie-img" src={image} />
      <p className="movie-title">{uname}</p>
    </div>
  );
}

export default memo(MovieCard);
