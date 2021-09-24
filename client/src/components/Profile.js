import styles from "./Profile.module.css";
import profile from "../images/profile.jpeg";
const Profile = () => {
  return (
    <div className={`${styles.profile} ${styles.container}`}>
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          <img src={profile} alt="profile " />
        </div>
        <div className={styles.profileBio}>
          <p className={styles.userName}>Keshava Varma</p>
          <p className={styles.userBio}>
            I am a Web Developer and Football Addict
          </p>
          <div className={styles.profileConnections}>
            <p>
              Posts <span>6</span>
            </p>
            <p>
              followers <span>200</span>
            </p>
            <p>
              following <span>150</span>
            </p>
          </div>
          <div className={styles.profileActions}>
            <button className="edit">Edit</button>
            <button className="logout">Logout</button>
          </div>
        </div>
      </div>
      <div className={styles.profilePosts}>
        <h3>Posts</h3>
        <ul className={styles.profilePostContainer}>
          <li>
            <img src={profile} alt="post" />
          </li>
          <li>
            <img src={profile} alt="post" />
          </li>
          <li>
            <img src={profile} alt="post" />
          </li>
          <li>
            <img src={profile} alt="post" />
          </li>
          <li>
            <img src={profile} alt="post" />
          </li>
          <li>
            <img src={profile} alt="post" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
