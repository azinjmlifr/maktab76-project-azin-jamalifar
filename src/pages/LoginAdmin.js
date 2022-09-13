// import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import { Link } from "react-router-dom";
// import styles from "../styles/style.module.css";
// import adminPic from "../assets/pictures/admin.jpeg";
// import Button from "react-bootstrap/Button";
// import { useDispatch } from "react-redux";

// const LoginAdmin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(login({ username, password }));
//   };
//   function validatePassword(value) {
//     setPassword(value);
//     let error = " ";
//     if (!value) {
//       error = "Required";
//     } else if (value !== "admin") {
//       error = "Invalid password address";
//     }
//     return error;
//   }

//   function validateUsername(value) {
//     setUsername(value);
//     let error = " ";
//     console.log(username);
//     if (!value) {
//       error = "Required";
//     } else if (value !== "admin") {
//       error = "Invalid username address";
//     }
//     return error;
//   }
//   return (
//     <div className={styles.adminLoginPage}>
//       <div className={styles.formik}>
//         <h1>ورود به پنل مدیریت</h1>
//         <Formik
//           initialValues={{
//             username: "",
//             password: "",
//           }}
//         >
//           {({ errors, touched, isValid }) => (
//             <Form
//               style={{ display: "flex", flexDirection: "column" }}
//               onSubmit={(e) => handleSubmit(e)}
//             >
//               <Field
//                 name="password"
//                 type="password"
//                 validate={validatePassword}
//               />
//               {errors.password && touched.password && (
//                 <div>{errors.password}</div>
//               )}

//               <Field name="username" validate={validateUsername} />
//               {errors.username && touched.username && (
//                 <div>{errors.username}</div>
//               )}

//               <Link to="/admin/productManagement">
//                 <Button type="submit">ورود</Button>
//               </Link>

//               <div>
//                 {" "}
//                 <Link to="/">
//                   <Button>صفحه اصلی</Button>{" "}
//                 </Link>{" "}
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//       <div>
//         <img
//           src={adminPic}
//           alt="pic"
//           style={{ width: "300px", height: "200px" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default LoginAdmin;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/user/UserSlice";
import Button from "react-bootstrap/Button";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, isLoggedIn } = useSelector((state) => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };
  if (isLoggedIn) return <Navigate to="/admin/productManagement" />;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {error && <h6 className="error">{error}</h6>}
        <h5>مدیریت</h5>
        <div className="form-row">
          <label htmlFor="username" className="form-label">
            نام کاربری
          </label>
          <input
            type="username"
            className="form-input"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            رمز عبور
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="button button-block">
          login
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="submit"
          className="btn btn-primary m-5"
        >
          بازگشت به سایت اصلی
        </Button>
      </form>
    </div>
  );
}

// import "bootstrap/dist/css/bootstrap.min.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { useState } from "react";
// import { login } from "../redux/user/UserSlice";

// export default function FormLoginPanelAdmin() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const { isLoggedIn, error } = useSelector((state) => state.users);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(login({ username, password }));
//   };
//   if (isLoggedIn) return <Navigate to="/AdminLayout" />;

//   return (
//     <div
//       style={{ position: "absolute", right: "350px", top: "100px" }}
//       className="justify-content-center border-4 border border-primary rounded p-5 w-50"
//     >
//       <form onSubmit={(e) => handleSubmit(e)}>
//         {error && <h6 className="error">{error}</h6>}
//         <div className="row mb-3">
//           <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
//             نام کاربری:
//           </label>
//           <div className="col-sm-10">
//             <input
//               type="username"
//               className="form-control"
//               id="inputEmail3"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             {/* <p>{ErrorName}</p> */}
//           </div>
//         </div>
//         <div className="row mb-3">
//           <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
//             رمز عبور:
//           </label>
//           <div className="col-sm-10">
//             <input
//               type="password"
//               className="form-control"
//               id="inputPassword3"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {/* <p>{ErrorPass}</p> */}
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary m-5"
//           // disabled={notValid}
//         >
//           ورود
//         </button>
//         <button
//           onClick={() => {
//             navigate("/");
//           }}
//           type="submit"
//           className="btn btn-primary m-5"
//         >
//           بازگشت به سایت اصلی
//         </button>
//       </form>
//     </div>
//   );
// }
