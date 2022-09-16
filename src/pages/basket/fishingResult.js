import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "../Error";
import Button from "react-bootstrap/Button";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { addOrders } from "../../redux/order/OrderSlice";
import { useDispatch } from "react-redux";
import failed from "../../assets/pictures/failed.jpg";
const PaymentResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setsearch] = useSearchParams();
  const [result, setResult] = useState(search.get("result"));
  const clientData = JSON.parse(localStorage.getItem("userData"));
  const total = JSON.parse(localStorage.getItem("total"));
  const orders = JSON.parse(localStorage.getItem("basketCount"));
  if (orders) {
    clientData.products = orders;
    clientData.prices = total;
  }

  useEffect(() => {
    if (result === "success") {
      dispatch(addOrders(clientData))
        .unwrap()
        .then((res) => {
          if (res.status === 200) {
            localStorage.clear();
          }
        });
    }
  }, [dispatch]);

  return (
    <div>
      {result === "success" ? (
        <div
          value={result}
          style={{ display: "flex", margin: "20px", marginRight: "400px" }}
        >
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
          <img src={failed} alt="" />
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
export default PaymentResult;
