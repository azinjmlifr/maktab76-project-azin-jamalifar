import { Link } from "react-router-dom";
import styles from "../styles/style.module.css";

// const intialState = {
//   password: "",
//   username: "",
// };

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <form>
        <div>
          <h3>پنل ورود مدیریت فروشگاه</h3>
          <div className={styles.dashboarInputLabel}>
            <label>نام کاربری</label>
            <input type="text" className={styles.dashboarInput} />
          </div>
          <div className={styles.dashboarInputLabel}>
            <label>رمزعبور</label>
            <input type="password" className={styles.dashboarInput} />
          </div>
          <div>
            <Link to="/admin">
              <button className={styles.dashboardBtn}>ورود</button>
            </Link>
          </div>
          <div>
            <Link to="/">
              <button className={styles.dashboardBtn}>صفحه اصلی</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Dashboard;
