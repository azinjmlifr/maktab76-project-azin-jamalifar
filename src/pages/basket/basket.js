import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import DeleteOrderModal from "./deletmodal";
import Alert from "react-bootstrap/Alert";

export default function Basket() {
  const [counter, setCounter] = useState(1);
  const [temp, setTemp] = useState();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let total = 0;

  const initialValue = 0;
  if (orders) {
    total = orders.reduce(
      (accumulator, current) => accumulator + current.price * current.count,
      initialValue
    );
  }

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("basketCount")));
  }, [counter]);

  useEffect(() => {
    localStorage.setItem("total", JSON.stringify(total));
  }, [total]);

  const handleModal = (item) => {
    setTemp(item);
    setShowDeleteModal(true);
  };

  return (
    <>
      {!orders ? (
        <>
          <Alert variant="success">
            <div style={{ textAlign: "center" }}>
              <Alert.Heading>سبد خرید شما خالی است !</Alert.Heading>
            </div>

            <hr />
            <div
              className="d-flex justify-content-end "
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                width: "100vh",
              }}
            >
              <Button onClick={() => setShow(false)} variant="outline-success">
                <Link style={{ color: "black", textDecoration: "none" }} to="/">
                  صفحه ی اصلی
                </Link>
              </Button>
            </div>
          </Alert>
        </>
      ) : (
        <div>
          <h1 style={{ margin: "20px" }}>سبد خرید</h1>
          <div
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              width: "700px",
              padding: "70px",
              display: "block",
              margin: "55px",
              marginRight: "340px",
              backgroundColor: "whitesmoke",
            }}
          >
            <Table
              striped
              className="w-100"
              style={{ border: "1px solid gray" }}
            >
              <thead>
                <tr>
                  <th>کالا</th>
                  <th>مجموع قیمت</th>
                  <th>تعداد</th>
                  <th>ویرایش</th>
                </tr>
              </thead>

              {orders.map((item) => (
                <tbody>
                  <tr id={item.id}>
                    <td>{item.name}</td>
                    <td>{parseInt(item.count) * parseInt(item.price)}</td>
                    <td>{item.count}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleModal(item)}
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50px",
              }}
            >
              <div style={{ display: "flex" }}>
                <h4>مجموع قیمت:</h4>
                <p id="total">{`${total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}</p>
              </div>
              {showDeleteModal && (
                <DeleteOrderModal
                  setShowDeleteModal={setShowDeleteModal}
                  showDeleteModal={showDeleteModal}
                  temp={temp}
                  total={total}
                />
              )}
              <Button
                type="submit"
                onClick={() => navigate("/finalbasket")}
                style={{ width: "200px" }}
                size="lg"
                variant="success"
              >
                پرداخت
              </Button>
              {"  "}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
