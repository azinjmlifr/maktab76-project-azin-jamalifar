import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import failed from "../../assets/pictures/failed.jpg";
import success from "../../assets/pictures/success.jpg";
import Error from "../Error/error";
import Button from "react-bootstrap/Button";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export const PaymentResult = () => {
  const navigate = useNavigate();
  const [search, setsearch] = useSearchParams();
  const [result, setResult] = useState(search.get("result"));

  return (
    <div>
      {result === "success" ? (
        <div
          value={result}
          style={{ display: "flex", margin: "20px", marginRight: "400px" }}
        >
          {localStorage.removeItem("cartItems")}
          <TiTick
            style={{ width: "200px", height: "200px", color: "#157347" }}
          />
          <div style={{ display: "block", marginTop: "50px" }}>
            <h3>پرداخت شما با موفقیت انجام شد.</h3>
            <p>سفارش شما ثبت گردید!</p>
            <Button variant="success" onClick={() => navigate("/")}>
              بازگشت به سایت
            </Button>
          </div>
        </div>
      ) : result === "failed" ? (
        <div
          value={result}
          style={{ display: "flex", margin: "20px", marginRight: "350px" }}
        >
          <ImCross
            style={{
              width: "200px",
              height: "200px",
              marginLeft: "50px",
              color: "#f74a4a",
            }}
          />
          <div style={{ display: "block" }}>
            <h3>پرداخت ناموفق!</h3>
            <p>
              پرداخت با موفقیت انجام نشد و سفارش شما در لیست انتظار می باشد.
            </p>
            <Button variant="danger" onClick={() => navigate("/basket")}>
              بازگشت به سبد خرید
            </Button>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};
