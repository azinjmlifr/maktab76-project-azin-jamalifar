// import React, { useEffect, useState, useCallback } from "react";
// import { OrderComponent } from "../../../components/order";
// import Form from "react-bootstrap/Form";
// import styles from "../../../styles/style.module.css";

// const axios = require("axios").default;

// const ProductManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isDelivered, setDelivered] = useState("delivered");

//   // const [currentPage, setCurrentPage] = useState(1);
//   // const [productPerPage, setProductPerPage] = useState(7);
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     await axios
//       .get(
//         `http://localhost:8000/orders?delivered=${isDelivered === "delivered"}`
//       )
//       .then((res) => {
//         const data = res.data;

//         setOrders(data);
//         setLoading(false);
//       });
//   }, [isDelivered, orders]);

//   useEffect(() => {
//     fetchOrders();
//   }, [isDelivered]);

//   return (
//     <>
//       <div className={styles.headerOfOrdersTable}>
//         <div>
//           <p>مدیریت سفارش ها</p>
//         </div>
//         <div className="d-flex ">
//           <Form.Check
//             // name="checkbox"
//             value={false}
//             // defaultValue={false}
//             type="radio"
//             id={Math.random()}
//             checked={isDelivered === "notDelivered"}
//             label="سفارش های در انتظار ارسال"
//             onChange={(e) => {
//               e.persist();

//               setDelivered("notDelivered");
//             }}
//           />
//           <Form.Check
//             // name="checkbox"
//             value={true}
//             // defaultValue={true}
//             checked={isDelivered === "delivered"}
//             type="radio"
//             id={Math.random()}
//             label="سفارش های تحویل شده"
//             onChange={(e) => {
//               e.persist();
//               setDelivered("delivered");
//             }}
//           />
//         </div>
//       </div>
//       <div>
//         <OrderComponent data={orders} loading={loading} x />
//       </div>
//     </>
//   );
// };

// export default ProductManagement;

// // const [allOrders, setAllOrders] = useState([]);
// // const [deliveredOrders, setDeliveredOrders] = useState([]);
// // const [onHoldOrders, setOnHoldOrders] = useState([]);
// // const [isDelivered, setDelivered] = useState("all");
// // const [currentPage, setCurrentPage] = useState(1);
// // const URl = `http://localhost:8000/`;

// // useEffect(() => {
// //   ProductManagement();
// // }, []);

// // const ProductManagement = async (currentPage) => {
// //   await axios
// //     .get(`${URl}orders?page=${currentPage}&_limit=3`)
// //     .then((res) => {
// //       setAllOrders(res.data);
// //     })
// //     .catch((error) => console.log(error));
// //   console.log("first");

// //   await axios
// //     .get(`${URL}orders?delivered=true&_page=${currentPage}&limit=2`)
// //     .then((res) => {
// //       setDeliveredOrders(res.data);
// //     })
// //     .catch((error) => console.log(error));

// //   await axios
// //     .get(`${URL}orders?delivered=false&_page=${currentPage}&limit=2`)
// //     .then((res) => {
// //       setOnHoldOrders(res.data);
// //     })
// //     .catch((error) => console.log(error));

// //   const handelChange = (event) => {
// //     setDelivered(event.target.value);
// //   };

// //   return (
// //     <>
// //       <div className={styles.headerOfOrdersTable}>
// //         <div>
// //           <p>مدیریت سفارش ها</p>
// //         </div>
// //         <div className="d-flex ">
// //           <input
// //             type="radio"
// //             id="all"
// //             name="all"
// //             value="all"
// //             checked={isDelivered === "all"}
// //             onChange={handelChange}
// //           />
// //           <label for="all">hame</label>
// //           <input
// //             type="radio"
// //             id="delivered"
// //             name="isDelivered"
// //             value="delivered"
// //             checked={isDelivered === "delivered"}
// //             onChange={handelChange}
// //           />
// //           <label for="all">سفارش های تحویل شده</label>
// //           <input
// //             type="radio"
// //             id="notDelivered"
// //             name="isDelivered"
// //             value="notDelivered"
// //             checked={isDelivered === "notDelivered"}
// //             onChange={handelChange}
// //           />
// //           <label for="all">سفارش های در انتظار ارسال</label>
// //         </div>
// //       </div>
// //       {/*
// //       {isDelivered === "delivered" ?
// //         return <OrderComponent data={deliveredOrders} loading={loading} />
// //        : return <OrderComponent data={onHoldOrders} loading={loading} />
// //       }; */}

// // <div>
// //   <OrderComponent data={allOrders} loading={loading} />
// // </div>
// //     </>
// //   );
// // };

// // export default ProductManagement;

// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import CheckOrder from "./CheckOrder";
// // import Pagination from "../../../components/Pagination";

// // function Order() {
// //   const [allOrders, setAllOrders] = useState([]);
// //   const [deliveredOrders, setDeliveredOrders] = useState([]);
// //   const [notDeliveredOrders, setNotDeliveredOrders] = useState([]);
// //   const [isDelivered, setDelivered] = useState("all");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [total, setTotal] = useState("");
// //   const URL = "http://localhost:8000/";
// //   const option = {
// //     year: "numeric",
// //     month: "numeric",
// //     day: "numeric",
// //   };

// //   useEffect(() => {
// //     getAllOrders();
// //   }, [isDelivered]);

// //   const persianNumber = (x) => {
// //     return x.toLocaleString("fa-IR");
// //   };

// //   const getAllOrders = async (currentPage) => {
// //     await axios
// //       .get(`${URL}orders?_page=${currentPage}&_limit=5`)
// //       .then((res) => {
// //         setAllOrders(res.data);
// //         setTotal(res.headers["x-total-count"]);
// //       })
// //       .catch((err) => console.log(err));

// //     await axios
// //       .get(`${URL}orders?delivered=true&_page=${currentPage}&_limit=5`)
// //       .then((res) => {
// //         setDeliveredOrders(res.data);
// //         setTotal(res.headers["x-total-count"]);
// //       })
// //       .catch((err) => console.log(err));

// //     await axios
// //       .get(`${URL}orders?delivered=false&_page=${currentPage}&_limit=5`)
// //       .then((res) => {
// //         setNotDeliveredOrders(res.data);
// //         setTotal(res.headers["x-total-count"]);
// //       })
// //       .catch((err) => console.log(err));
// //   };

// //   const handleChange = (event) => {
// //     setDelivered(event.target.value);
// //   };

// //   return (
// //     <div className="mt-64 flex flex-col justify-center items-center">
// //       <div className="flex w-[80%] justify-between">
// //         <p className="text-[#ffbd07] font-extrabold text-3xl border-b-4 border-[#ffbd07]">
// //           {" "}
// //           مدیریت سفارش ها{" "}
// //         </p>
// //         <div className="flex ">
// //           <div className="ml-3">
// //             <input
// //               type="radio"
// //               id="all"
// //               name="all"
// //               value="all"
// //               checked={isDelivered === "all"}
// //               onChange={handleChange}
// //               className="ml-2"
// //             />
// //             <label className="border-b-2 border-[#ffbd07] text-[#ffbd07] font-extrabold text-2xl">
// //               همه
// //             </label>
// //
// //           </div>
// //           <div className="ml-3">
// //             <input
// //               type="radio"
// //               id="delivered"
// //               name="isDelivered"
// //               value="delivered"
// //               checked={isDelivered === "delivered"}
// //               onChange={handleChange}
// //               className="ml-2"
// //             />
// //             <label className="border-b-2 border-[#ffbd07] text-[#ffbd07] font-extrabold text-2xl">
// //               سفارش های تحویل داده شده
// //             </label>
// //
// //           </div>
// //           <div>
// //             <input
// //               type="radio"
// //               id="notDelivered"
// //               name="isDelivered"
// //               value="notDelivered"
// //               checked={isDelivered === "notDelivered"}
// //               onChange={handleChange}
// //               className="ml-2"
// //             />
// //             <label className="border-b-2 border-[#ffbd07] text-[#ffbd07] font-extrabold text-2xl">
// //               سفارش های در حال انتظار
// //             </label>
// //           </div>
// //         </div>
// //       </div>
// //       <table className="border-2 border-[#ffa5a4] mt-24 w-[80%] ">
// //         <tr className=" bg-[#ffa5a4] h-10">
// //           <th className="text-center">نام کاربر</th>
// //           <th className="text-center">مجموع مبلغ</th>
// //           <th className="text-center">زمان ثبت سفارش</th>
// //           <th className="text-center">بررسی</th>
// //         </tr>

// //         {isDelivered === "delivered"
// //           ? deliveredOrders.map((el) => {
// //               return (
// //                 <tr key={el.id} className="  odd:bg-[#7bdeeb]">
// //                   <td className="text-center">
// //                     {el.username} {el.lastname}
// //                   </td>
// //                   <td className="text-center">{persianNumber(el.prices)}</td>
// //                   <td className="text-center">
// //                     {new Date(el.expectAt).toLocaleString("fa-IR", option)}
// //                   </td>
// //                   <td className="text-center">
// //                     {" "}
// //                     <CheckOrder id={el.id} />{" "}
// //                   </td>
// //                 </tr>
// //               );
// //             })
// //           : isDelivered === "notDelivered"
// //           ? notDeliveredOrders.map((el) => {
// //               return (
// //                 <tr key={el.id} className=" odd:bg-[#7bdeeb]">
// //                   <td className="text-center">
// //                     {el.username} {el.lastname}
// //                   </td>
// //                   <td className="text-center">{persianNumber(el.prices)}</td>
// //                   <td className="text-center">
// //                     {new Date(el.expectAt).toLocaleString("fa-IR", option)}
// //                   </td>
// //                   <td className="text-center">
// //                     {" "}
// //                     <CheckOrder id={el.id} />{" "}
// //                   </td>
// //                 </tr>
// //               );
// //             })
// //           : allOrders.map((el) => {
// //               return (
// //                 <tr key={el.id} className=" odd:bg-[#7bdeeb]">
// //                   <td className="text-center">
// //                     {el.username} {el.lastname}
// //                   </td>
// //                   <td className="text-center">{persianNumber(el.prices)}</td>
// //                   <td className="text-center">
// //                     {new Date(el.expectAt).toLocaleString("fa-IR", option)}
// //                   </td>
// //                   <td className="text-center">
// //                     {" "}
// //                     <CheckOrder id={el.id} />{" "}
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //       </table>
// //       <Pagination
// //         currentPage={currentPage}
// //         total={total}
// //         getProducts={getAllOrders}
// //       />
// //     </div>
// //   );
// // }

// // export default Order;

import { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import { GiShoppingBag } from "react-icons/gi";
import OrderModal from "./modal/ordermodal";
import styles from "../../../styles/style.module.css";

const URL_delivered = "http://localhost:8000/orders?delivered=true";
const URL_notdelivered = "http://localhost:8000/orders?delivered=false";

const Order = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [temp, setTemp] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let limit = 2;

  const fetchOrders = useCallback(
    async (currentPage) => {
      const res = await fetch(
        `${URL_delivered}?_page=${currentPage}&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
      setCurrentPage(currentPage);
    },
    [limit]
  );
  useEffect(() => {
    fetchOrders(1);
  }, [fetchOrders]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    fetchOrders(currentPage);
  };

  const handleOrderModal = (item) => {
    setTemp(item);
    setShowOrderModal(true);
  };

  const handleChange = (event) => {
    if (event.target.value === "false") {
      const fetchData = async () => {
        const DataResource = await fetch(URL_notdelivered);
        const data = await DataResource.json();
        setItems(data);
      };
      fetchData();
    } else if (event.target.value === "true") {
      const fetchData = async () => {
        const DataResource = await fetch(URL_delivered);
        const data = await DataResource.json();
        setItems(data);
      };
      fetchData();
    }
  };

  return (
    <div style={{ height: "500px" }}>
      <form onChange={(event) => handleChange(event)}>
        <div style={{ margin: "10px", display: "inline-flex" }}>
          <p>در انتظار ارسال</p>
          <input value="false" type="radio" name="radio" />
        </div>
        <div style={{ margin: "10px", display: "inline-flex" }}>
          <p>تحویل داده شده</p>
          <input value="true" type="radio" name="radio" />
        </div>
      </form>
      <Table
        striped
        bordered
        style={{
          backgroundColor: "white",
          border: "2px black solid",
          textAlign: "center",
          marginRight: "340px",
        }}
        className="w-50"
      >
        <thead>
          <tr>
            <th>نام کاربر</th>
            <th>زمان ثبت سفارش</th>
            <th>مجموع مبلغ</th>
            <th>وضعیت سفارش</th>
            <th>بررسی سفارش ها</th>
          </tr>
        </thead>

        {items.length > 0
          ? items?.map((item, i) => (
              <thead key={i}>
                <tr id={item.id}>
                  <td>{`${item?.username} ${item?.lastname}`}</td>
                  <td>{`${new Date(item?.createdAt).toLocaleDateString(
                    "fa-IR"
                  )}`}</td>
                  <td>{` ${item?.prices
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}</td>
                  <td>
                    {item.delivered === "true"
                      ? "تحویل داده شده"
                      : "در انتظار ارسال"}
                  </td>
                  <td>
                    {showOrderModal && (
                      <OrderModal
                        temp={temp}
                        showOrderModal={showOrderModal}
                        setShowOrderModal={setShowOrderModal}
                        fetchOrders={fetchOrders}
                        currentPage={currentPage}
                        handleCancel={() => setShowOrderModal(false)}
                      />
                    )}
                    <Button
                      onClick={() => handleOrderModal(item)}
                      variant="secondary"
                    >
                      {" "}
                      بررسی سفارش
                      <GiShoppingBag />
                    </Button>
                  </td>
                </tr>
              </thead>
            ))
          : null}
      </Table>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Order;
