import React, { useEffect, useState } from "react";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputField } from "./inputfield";
import { Button } from "react-bootstrap";

export default function FinalBasket() {
  const navigate = useNavigate();
  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(JSON.parse(localStorage.getItem("total")));
  }, []);

  const validate = Yup.object({
    username: Yup.string().required("پر کردن این قسمت الزامیست!"),
    lastname: Yup.string().required("پر کردن این قسمت الزامیست!"),
    address: Yup.string().required("پر کردن این قسمت الزامیست!"),
    phone: Yup.string()
      .required("پر کردن این قسمت الزامیست!")
      .min(10, "شماره ی وارد شده قابل قبول نمی باشد!"),
    expectAt: Yup.string().required("پر کردن این قسمت الزامیست!"),
  });
  const handleSubmit = (values) => {
    localStorage.setItem("userData", JSON.stringify(values, null, 2));
    navigate("//localhost:3001");
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
          expectAt: new Date().getTime(),
          prices: total,
          delivered: false,
          createdAt: new Date().getTime(),
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
                value={new Date(formik.values.expectAt).getTime()}
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
