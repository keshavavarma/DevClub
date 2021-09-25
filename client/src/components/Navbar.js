import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const homepageHandler = () => {
    history.push("/");
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h2 className={styles.brand} onClick={homepageHandler}>
          Pixtagram
        </h2>
        <div className={styles.navigationlinks}>
          <Link to="/Login">Login</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/Register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
