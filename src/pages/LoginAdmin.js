import { Link } from "react-router-dom";
import styles from "../styles/style.module.css";

import React, { useEffect, useState } from "react";

function RegistrationView() {
  const [inputValues, setInputValue] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //handle submit updates
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = validation;

    //first Name validation
    const cond1 = "admin";
    const fName = inputValues.fName;
    if (!fName) {
      errors.fName = "! نام کاربری الزامی است";
    } else if (!fName.toString().match(cond1)) {
      errors.fName = "نام کاربری اشتباه است";
    } else {
      errors.fName = "";
    }

    //password validation
    const cond2 = "admin";
    const password = inputValues.password;
    if (!password) {
      errors.password = "!رمز عبور الزامی است";
    } else if (!password.match(cond2)) {
      errors.password = "رمز عبور اشتباه است";
    } else {
      errors.password = "";
    }

    //matchPassword validation
    if (!inputValues.confirmPassword) {
      errors.confirmPassword = "! تایید رمز عبور الزامی است ";
    } else if (inputValues.confirmPassword !== inputValues.Password) {
      errors.confirmPassword = " تایید رمز عبور اشتباه است";
      errors.password = "";
    }

    setValidation(errors);
  };

  useEffect(() => {
    checkValidation();
  }, [inputValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  let errors = validation;
  const isValid = errors.confirmPassword === "" && errors.fName === "";

  return (
    <div>
      <div className={styles.dashboardContainer}>
        <form onSubmit={handleSubmit}>
          <h3>پنل ورود مدیریت فروشگاه</h3>
          <div className={styles.dashboarInputLabel}>
            <label>نام کاربری</label>
            <input
              placeholder="First Name"
              type="string"
              name="fName"
              id="fName"
              className={styles.dashboarInput}
              onChange={(e) => handleChange(e)}
              value={inputValues.fName}
            />
            {validation.fName && <p>{validation.fName}</p>}
          </div>

          <div className={styles.dashboarInputLabel}>
            <label>رمزعبور</label>
            <input
              placeholder="password"
              type="password"
              name="password"
              className={styles.dashboarInput}
              onChange={(e) => handleChange(e)}
              value={inputValues.password}
              required
            />
            {validation.password && <p>{validation.password}</p>}
          </div>
          <div className={styles.dashboarInputLabel}>
            <label> تایید رمزعبور </label>
            <input
              placeholder="confirm password"
              type="password"
              name="confirmPassword"
              className={styles.dashboarInput}
              onChange={(e) => handleChange(e)}
              value={inputValues.confirmPassword}
              required
            />
          </div>
          <Link to="/admin/productManagement">
            <input
              type="submit"
              className={styles.dashboardBtn}
              value="ورود"
              disabled={isValid}
            />
          </Link>
          <div>
            {" "}
            <Link to="/">
              <button className={styles.dashboardBtn}>صفحه اصلی</button>{" "}
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationView;
