import { NavLink } from "react-router-dom";
import styles from "../styles/style.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div>
          <NavLink
            to="/basket"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Basket
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Admin
          </NavLink>
        </div>
      </div>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
