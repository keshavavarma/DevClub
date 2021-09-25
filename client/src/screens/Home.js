import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import styles from "./Home.module.css";
import profile from "../images/profile.jpeg";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [like, setLike] = useState(false);

  const history = useHistory();
  const createHandler = () => {
    history.push("/CreatePost");
  };
  const likeHandler = () => {
    setLike(!like);
  };
  return (
    <div className={`${styles.feed} ${styles.container}`}>
      <button className={styles.createPost} onClick={createHandler}>
        +
      </button>
      <div className={`${styles.post} ${styles.card}`}>
        <div className={styles.userInfo}>
          <img src={profile} alt=" profile" />
          <p>Keshava Varma</p>
        </div>
        <div className={styles.feedImgContainer}>
          <img src={profile} alt="post" />
        </div>
        <div className={styles.feedPostActions}>
          {like ? (
            <button className="likes" onClick={likeHandler}>
              <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
            </button>
          ) : (
            <button className="likes" onClick={likeHandler}>
              <FavoriteBorderOutlinedIcon fontSize="large" />
            </button>
          )}
          <span>10 likes</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
