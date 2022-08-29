import React, { useEffect, useState } from "react";
import { OrderComponent } from "../../../components/order";
import Form from "react-bootstrap/Form";
import styles from "../../../styles/style.module.css";
const axios = require("axios").default;

const ProductManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(7);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      axios.get(`http://localhost:8000/orders`).then((res) => {
        const data = res.data;
        setOrders(data);
        setLoading(false);
      });
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
            name="onHold"
            value="false"
            type="radio"
            id={Math.random()}
            label="سفارش های در انتظار ارسال"
          />
          <Form.Check
            name="delivered"
            value="true`"
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

// const [allOrders, setAllOrders] = useState([]);
// const [deliveredOrders, setDeliveredOrders] = useState([]);
// const [onHoldOrders, setOnHoldOrders] = useState([]);
// const [isDelivered, setDelivered] = useState("all");
// const [currentPage, setCurrentPage] = useState(1);
// const URl = `http://localhost:8000/`;

// useEffect(() => {
//   ProductManagement();
// }, []);

// const ProductManagement = async (currentPage) => {
//   await axios
//     .get(`${URl}orders?page=${currentPage}&_limit=3`)
//     .then((res) => {
//       setAllOrders(res.data);
//     })
//     .catch((error) => console.log(error));
//   console.log("first");

//   await axios
//     .get(`${URL}orders?delivered=true&_page=${currentPage}&limit=2`)
//     .then((res) => {
//       setDeliveredOrders(res.data);
//     })
//     .catch((error) => console.log(error));

//   await axios
//     .get(`${URL}orders?delivered=false&_page=${currentPage}&limit=2`)
//     .then((res) => {
//       setOnHoldOrders(res.data);
//     })
//     .catch((error) => console.log(error));

//   const handelChange = (event) => {
//     setDelivered(event.target.value);
//   };

//   return (
//     <>
//       <div className={styles.headerOfOrdersTable}>
//         <div>
//           <p>مدیریت سفارش ها</p>
//         </div>
//         <div className="d-flex ">
//           <input
//             type="radio"
//             id="all"
//             name="all"
//             value="all"
//             checked={isDelivered === "all"}
//             onChange={handelChange}
//           />
//           <label for="all">hame</label>
//           <input
//             type="radio"
//             id="delivered"
//             name="isDelivered"
//             value="delivered"
//             checked={isDelivered === "delivered"}
//             onChange={handelChange}
//           />
//           <label for="all">سفارش های تحویل شده</label>
//           <input
//             type="radio"
//             id="notDelivered"
//             name="isDelivered"
//             value="notDelivered"
//             checked={isDelivered === "notDelivered"}
//             onChange={handelChange}
//           />
//           <label for="all">سفارش های در انتظار ارسال</label>
//         </div>
//       </div>
//       {/*
//       {isDelivered === "delivered" ?
//         return <OrderComponent data={deliveredOrders} loading={loading} />
//        : return <OrderComponent data={onHoldOrders} loading={loading} />
//       }; */}

//       <div>
//         <OrderComponent data={allOrders} loading={loading} />
//       </div>
//     </>
//   );
// };

// export default ProductManagement;
