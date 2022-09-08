import { NavLink } from "react-router-dom";
import styles from "../../styles/style.module.css";

export const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarAdminForSides}>
        <p>مدیریت فروشگاه</p>
      </div>
      <div className={styles.navbarLeft}>
        <div>
          <NavLink
            to="/admin/orders"
            className={`${({ isActive }) =>
              isActive ? "link active" : "link"} ${styles.navbarText}`}
          >
            سفارش ها
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/priceAndstock"
            className={`${({ isActive }) =>
              isActive ? "link active" : "link"} ${styles.navbarText}`}
          >
            موجودی و قیمت ها
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/productManagement"
            className={`${({ isActive }) =>
              isActive ? "link active" : "link"} ${styles.navbarText}`}
          >
            کالاها
          </NavLink>
        </div>
      </div>
      <div className={styles.navbarAdminForSides}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active" : "link")}
          style={{ textDecoration: "none" }}
        >
          فروشگاه فلان
        </NavLink>
      </div>
    </nav>
  );
};
