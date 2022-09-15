import { NavLink } from "react-router-dom";
import styles from "../../styles/style.module.css";
import React, { useEffect, useState } from "react";

export const Header = () => {
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   setOrders(JSON.parse(localStorage.getItem("basketCount")).length);
  // }, [orders]);

  return (
    <nav className={styles.navbar}>
      <div>
        {/* <img
          src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-shop-icon-png-image_319729.jpg"
          style={{ width: "20px" }}
        /> */}
        <NavLink
          to="/"
          className={`${({ isActive }) =>
            isActive ? "link active" : "link"} ${styles.navbarAdminForSides}`}
          style={{ textDecoration: "none" }}
        >
          سوپر مارکت
        </NavLink>
      </div>
      <div className={styles.navbarLeft}>
        <div className={styles.navbarText}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            style={{ textDecoration: "none" }}
          >
            مدیریت
          </NavLink>
        </div>
        <div className={styles.navbarText}>
          <NavLink
            to="/basket"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            style={{ textDecoration: "none" }}
          >
            سبدخرید{orders}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
