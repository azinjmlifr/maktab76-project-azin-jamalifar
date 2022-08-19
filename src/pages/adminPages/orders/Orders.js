import React, { useEffect, useState } from "react";
import { OrderComponent } from "../../../components/order";
import Form from "react-bootstrap/Form";
import styles from "../../../styles/style.module.css";

const ProductManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(7);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/orders?_page=1`);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className={styles.headerOfOrdersTable}>
        <div>
          <p>مدیریت سفارش ها</p>
        </div>
        <div className="d-flex ">
          <Form.Check
            type="radio"
            id={Math.random()}
            label="سفارش های در انتظار ارسال"
          />
          <Form.Check
            type="radio"
            id={Math.random()}
            label="سفارش های تحویل شده"
          />
        </div>
      </div>

      <div>
        <OrderComponent data={orders} loading={loading} />
      </div>
    </>
  );
};

export default ProductManagement;
