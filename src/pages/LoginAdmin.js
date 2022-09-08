// import { Link } from "react-router-dom";
// import styles from "../styles/style.module.css";
// import React, { useEffect, useState } from "react";
// import { useCallback } from "react";

// function RegistrationView() {
//   const [inputValues, setInputValue] = useState({
//     fName: "",
//     password: "",
//   });

//   const [validation, setValidation] = useState({
//     fName: "",
//     password: "",
//   });

//   //handle submit updates
//   function handleChange(event) {
//     const { name, value } = event.target;
//     setInputValue({ ...inputValues, [name]: value });
//   }

//   const checkValidation = useCallback(() => {
//     // let errors = validation;
//     //first Name validation
//     const cond1 = "admin";
//     const fName = inputValues.fName;
//     console.log(!!fName);
//     if (!fName) {
//       setValidation((prevState) => {
//         return { ...prevState, fName: "! نام کاربری الزامی است" };
//       });
//       console.log("first");
//     } else if (!fName.toString().match(cond1)) {
//       setValidation({ ...validation, fName: "نام کاربری اشتباه است" });
//     } else {
//       setValidation({ ...validation, fName: " " });
//       console.log("else");
//     }

//     //password validation

//     const password = inputValues.password;
//     if (!password) {
//       setValidation({ ...validation, password: "!رمز عبور الزامی است" });
//     } else if (!password.match(cond1)) {
//       setValidation({ ...validation, password: "رمز عبور اشتباه است" });
//     } else {
//       setValidation({ ...validation, password: " " });
//     }

//     // setValidation(errors);
//   }, []);

//   useEffect(() => {
//     checkValidation();
//   }, [inputValues]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   console.log(validation);
//   const isValid = validation.fName === "" || validation.password === "";

//   return (
//     <>
//       <div>
//         <div className={styles.dashboardContainer}>
//           <form onSubmit={handleSubmit}>
//             <h3>پنل ورود مدیریت فروشگاه</h3>
//             <div className={styles.dashboarInputLabel}>
//               <label>نام کاربری</label>
//               <input
//                 placeholder="First Name"
//                 type="string"
//                 name="fName"
//                 id="fName"
//                 className={styles.dashboarInput}
//                 onChange={(e) => handleChange(e)}
//                 value={inputValues.fName}
//               />
//               {validation.fName && <p>{validation.fName}</p>}
//             </div>

//             <div className={styles.dashboarInputLabel}>
//               <label>رمزعبور</label>
//               <input
//                 placeholder="password"
//                 type="password"
//                 name="password"
//                 className={styles.dashboarInput}
//                 onChange={(e) => handleChange(e)}
//                 value={inputValues.password}
//                 required
//               />
//               {validation.password && <p>{validation.password}</p>}
//             </div>

// <Link to="/admin/productManagement">
//   <input
//     type="submit"
//     className={styles.dashboardBtn}
//     value="ورود"
//     disabled={!isValid}
//   />
// </Link>
// <div>
//   {" "}
//   <Link to="/">
//     <button className={styles.dashboardBtn}>صفحه اصلی</button>{" "}
//   </Link>{" "}
// </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default RegistrationView;

// import React, { useState } from "react";
// import { TextField, InputAdornment, IconButton } from "@material-ui/core";
// import { Person, Lock } from "@material-ui/icons";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import SubmitForm from "./SubmitForm";
// import formStyle from "../styles/form.module.css";
// import { Link } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// const SignIn = () => {
//   const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email address is required"),
//       password: Yup.string().min(5).required("Password is required"),
//     }),

//     onSubmit: () => {
//       setIsSubmitSuccess(true);
//     },
//   });
//   let cond = "admin";

//   return (
// <div className={formStyle.container}>
//   <div
//     className={
//       !isSubmitSuccess
//         ? formStyle.signin && formStyle.signin_wrapper
//         : formStyle.signin && formStyle.signin_success
//     }
//     style={{ margin: "100px" }}
//   >
//     {isSubmitSuccess ? (
//       <SubmitForm />
//     ) : (
//       <form onSubmit={formik.handleSubmit}>
//         <h2>Login Form</h2>
//         <TextField
//           name="email"
//           type="text"
//           placeholder="Email"
//           className={formStyle.textField}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment>
//                 <IconButton>
//                   <Person />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//         />

//         {formik.touched.email && formik.errors.email ? (
//           <div className={formStyle.error_msg}>{formik.errors.email}</div>
//         ) : null}

//         <TextField
//           name="password"
//           type="password"
//           placeholder="Password"
//           className={formStyle.textField}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment>
//                 <IconButton>
//                   <Lock />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         />
//         {formik.touched.password && formik.errors.password ? (
//           <div className={formStyle.error_msg}>
//             {formik.errors.password}
//           </div>
//         ) : null}

//         <button type="submit">Login</button>
//         <div>
//           {" "}
//           <Link to="/">
//             <button>صفحه اصلی</button>{" "}
//           </Link>{" "}
//         </div>
//       </form>
//     )}
//   </div>
// </div>

//     <div>
//       <h1>Any place in your app!</h1>
//       <Formik
//         initialValues={{ name: "", password: "" }}
//         validate={(values) => {
//           const errors = {};
//           if (!values.name ) {
//             errors.name = "Required";
//           } else if (values.name.toString() !== "admin") {
//             errors.name = "Invalid email address";
//           }
//           return errors;
//         }}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//           }, 400);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <Field type="text" name="name" />
//             <ErrorMessage name="name" component="div" />
//             <Field type="password" name="password" />
//             <ErrorMessage name="password" component="div" />
//             <button type="submit" disabled={isSubmitting}>
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default SignIn;
import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

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
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      // onSubmit={(values) => {
      //   // same shape as initial values
      //   console.log(values);
      // }}
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
