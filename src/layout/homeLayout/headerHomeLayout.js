import { NavLink } from "react-router-dom";
import styles from "../../styles/style.module.css";

export const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div>
          <NavLink
            to="/basket"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            سبدخرید
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            مدیریت
          </NavLink>
        </div>
      </div>
      <div>
        <img
          src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-shop-icon-png-image_319729.jpg"
          style={{ width: "20px" }}
        />
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          فروشگاه فلان
        </NavLink>
      </div>
    </nav>
  );
};
