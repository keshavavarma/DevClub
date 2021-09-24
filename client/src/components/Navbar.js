import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h2 className={styles.brand}>
          <Link to="/">Instagram</Link>
        </h2>
        <div className={styles.navigationlinks}>
          <Link to="/Login">Login</Link>
          <Link to="/Profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
