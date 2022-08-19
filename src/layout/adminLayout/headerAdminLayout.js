import { NavLink } from "react-router-dom";
import styles from "../../styles/style.module.css";

export const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <p>مدیریت فروشگاه</p>
      </div>
      <div className={styles.navbarLeft}>
        <div>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            سفارش ها
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/priceAndstock"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            موجودی و قیمت ها
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/productManagement"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            کالاها
          </NavLink>
        </div>
      </div>
      <div>
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
