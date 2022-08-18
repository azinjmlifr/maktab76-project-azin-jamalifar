import { NavLink } from "react-router-dom";
import styles from "../../styles/style.module.css";

export const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <p>modiriat froshgah</p>
      </div>
      <div className={styles.navbarLeft}>
        <div>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            orders
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/priceAndstock"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            priceAndstock
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/productManagement"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            productManagement
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
