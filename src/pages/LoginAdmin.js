import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import styles from "../styles/style.module.css";

function validatePassword(value) {
  let error = " ";
  if (!value) {
    error = "Required";
  } else if (value !== "admin") {
    error = "Invalid password address";
  }
  return error;
}

function validateUsername(value) {
  let error = " ";
  if (!value) {
    error = "Required";
  } else if (value !== "admin") {
    error = "Invalid username address";
  }
  return error;
}

const LoginAdmin = () => (
  <div className={styles.adminLoginPage}>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form>
          <Field name="password" type="password" validate={validatePassword} />
          {errors.password && touched.password && <div>{errors.password}</div>}

          <Field name="username" validate={validateUsername} />
          {errors.username && touched.username && <div>{errors.username}</div>}
          <Link to="/admin/productManagement">
            <input type="submit" value="ورود" disabled={isValid} />
          </Link>
          <div>
            {" "}
            <Link to="/">
              <button>صفحه اصلی</button>{" "}
            </Link>{" "}
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginAdmin;
