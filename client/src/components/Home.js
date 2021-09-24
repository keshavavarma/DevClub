import styles from "./Home.module.css";
import profile from "../images/profile.jpeg";
const Home = () => {
  return (
    <div className={`${styles.feed} ${styles.container}`}>
      <button className={styles.createPost}>+</button>
      <div className={`${styles.post} ${styles.card}`}>
        <div className={styles.userInfo}>
          <img src={profile} alt=" profile" />
          <p>Keshava Varma</p>
        </div>
        <div className={styles.feedImgContainer}>
          <img src={profile} alt="post" />
        </div>
        <div className={styles.feedPostActions}>
          <button className="likes">like</button>
          <span>10 likes</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
