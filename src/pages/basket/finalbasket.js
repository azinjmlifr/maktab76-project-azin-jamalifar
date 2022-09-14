import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputField } from "./inputfield";
import { Button } from "react-bootstrap";

export default function FinalBasket() {
  const navigate = useNavigate();
  // const phoneRegExp =
  //   /^((\\0[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validate = Yup.object({
    username: Yup.string().required("پر کردن این قسمت الزامیست!"),
    lastname: Yup.string().required("پر کردن این قسمت الزامیست!"),
    address: Yup.string().required("پر کردن این قسمت الزامیست!"),
    phone: Yup.string()
      .required("پر کردن این قسمت الزامیست!")
      .max(11,"شماره ی وارد شده قابل قبول نمی باشد!"),
    expectAt: Yup.string().required("پر کردن این قسمت الزامیست!"),
  });
  const handleSubmit = () => {
    // const data = new FormData(e.target);
    // console.log(data.get("username"));
    // let obj = {
    //   username: data.get("username"),
    //   lastname: data.get("lastname"),
    //   address: data.get("address"),
    //   phone: data.get("phone"),
    //   expectAt: parseInt(
    //     (new Date(data.get("expectAt")).getTime() / 1000).toFixed(0)
    //   ),
    // };

    // localStorage.setItem("CustomerInfo", JSON.stringify(obj));
    navigate("//localhost:3002");
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <h1 style={{ margin: "20px" }}>نهایی کردن سبد خرید</h1>
      <Formik
        initialValues={{
          username: "",
          lastname: "",
          address: "",
          phone: "",
          expectAt: "",
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <div style={{ width: "600px", marginRight: "400px" }}>
            <Form
              style={{
                backgroundColor: "whitesmoke",
                border: "0.5px solid gray",
                borderRadius: "5px",
                padding: "30px",
              }}
              onSubmit={formik.handleSubmit}
            >
              <InputField
                label="نام:"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
              />

              <InputField
                label="نام خانوادگی: "
                name="lastname"
                type="text"
                value={formik.values.lastname}
              />

              <InputField
                label="آدرس:"
                name="address"
                type="text"
                placeholder="شهر...منطقه...خیابان...پلاک..."
                onChange={formik.handleChange}
                value={formik.values.address}
              />

              <InputField
                label="تلفن همراه:"
                name="phone"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />

              <InputField
                label="تاریخ تحویل:"
                name="expectAt"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.expectAt}
              />

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="submit"
                  style={{ width: "200px" }}
                  size="lg"
                  variant="success"
                >
                  پرداخت
                </Button>
                {"  "}
                <Button
                  type="reset"
                  onClick={() => navigate("/")}
                  size="lg"
                  variant="danger"
                >
                  انصراف
                </Button>
                {"  "}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";

// export default function FinalBasket() {
//   const phoneRegExp =
//     /^((\\0[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//   const dateRegExp = /^[0-9]{4}[0-9]{2}[0-9]{2}/;
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       lastname: "",
//       address: "",
//       phone: "",
//       expectAt: "",
//     },
//     onSubmit: (values,e) => {
//       e.preventDefault();
//       const data = new FormData(e.target);
//       console.log(data.get("username"));
//       let obj = {
//         username: data.get("username"),
//         lastName: data.get("lastName"),
//         address: data.get("address"),
//         phone: data.get("phone"),
//         expectAt: parseInt(
//           (new Date(data.get("expectAt")).getTime() / 1000).toFixed(0)
//         ),
//       };
//       localStorage.setItem(values, JSON.stringify(obj));
//       navigate("//localhost:3002");
//     },
//     validationSchema: Yup.object({
//       username: Yup.string().required("پر کردن این قسمت الزامیست!"),
//       lastName: Yup.string().required("پر کردن این قسمت الزامیست!"),
//       address: Yup.string().required("پر کردن این قسمت الزامیست!"),
//       phone: Yup.string()
//         .required("پر کردن این قسمت الزامیست!")
//         .matches(phoneRegExp, "شماره ی وارد شده صحیح نمیباشد!")
//         .min(10, "غیر قابل قبول")
//         .max(10, "غیر قابل قبول"),
//       expectAt: Yup.string()
//         .required("پر کردن این قسمت الزامیست!")
//        
//     }),
//   });
//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="username">نام:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={formik.values.username}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.username && formik.errors.username ? (
//           <div>{formik.errors.username}</div>
//         ) : null}
//         <label htmlFor="lastName">نام خانوادگی:</label>
//         <input
//           type="text"
//           id="lastName"
//           name="lastName"
//           value={formik.values.lastName}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.lastName && formik.errors.lastName ? (
//           <div>{formik.errors.lastName}</div>
//         ) : null}
//         <label htmlFor="address">آدرس</label>
//         <input
//           type="text"
//           id="address"
//           name="address"
//           placeholder="شهر...منطقه...خیابان...پلاک..."
//           value={formik.values.address}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.address && formik.errors.address ? (
//           <div>{formik.errors.address}</div>
//         ) : null}
//         <label htmlFor="phone">تلفن همراه:</label>
//         <input
//           type="text"
//           id="phone"
//           name="phone"
//           value={formik.values.phone}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.phone && formik.errors.phone ? (
//           <div>{formik.errors.phone}</div>
//         ) : null}
//         <label htmlFor="expectAt">تاریخ ارسال:</label>
//         <input
//           type="text"
//           id="expectAt"
//           name="expectAt"
//           placeholder="1400/05/07"
//           value={formik.values.expectAt}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.expectAt && formik.errors.expectAt ? (
//           <div>{formik.errors.expectAt}</div>
//         ) : null}

//         <div
//           style={{
//             marginTop: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Button style={{ width: "200px" }} size="lg" variant="success">
//             پرداخت
//           </Button>
//           {"  "}
//           <Button
//             type="reset"
//             onClick={() => navigate("/")}
//             size="lg"
//             variant="danger"
//           >
//             انصراف
//           </Button>
//           {"  "}
//         </div>
//       </form>
//     </div>
//   );
// }
