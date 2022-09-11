// import React from "react";

// export const OrderComponent = ({ orders, loading }) => {
//   if (loading) {
//     return <h2>loading ...</h2>;
//   }
//   const editQuantity = async (event, id) => {
//     await fetch(`http://localhost:8000/products/${id}`, {
//       method: "PATCH",
//       headers: {
//         Accept: "application/json",
//         Content: "application/json",
//       },
//       body: JSON.stringify({ price: editQuantity.target.value }),
//     });
//   };
//   return (
//     <>
// <Table striped className={styles.table}>
//   <thead>
//     <tr>
//       <th>نام کاربر</th>
//       <th>مجموع مبلغ</th>
//       <th>زمان ثبت سفارش</th>
//       <th></th>
//     </tr>
//   </thead>
//   <tbody>
//     {orders.map((order, index) => {
//       const { username, id, lastname, prices, createdAt } = order;
//       return (
//         <tr key={id}>
//           <td>{username + " " + lastname}</td>
//           <td>{prices}</td>
//           <td>{createdAt}</td>
//           <td>
//             <a href="#">بررسی سفارش</a>
//           </td>
//         </tr>
//       );
//     })}
//   </tbody>
// </Table>
//     </>
//   );
// };

// <Table striped className={styles.table}>
//         <thead>
//           <tr>
//             <th>نام کاربر</th>
//             <th>مجموع مبلغ</th>
//             <th>زمان ثبت سفارش</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((order, index) => {
//             const { username, id, lastname, prices, createdAt } = order;
//             return (
//               <tr key={id}>
//                 <td>{username + " " + lastname}</td>
//                 <td>{prices}</td>
//                 <td>{createdAt}</td>
//                 <td>
//                   <a href="#">بررسی سفارش</a>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>

import Table from "react-bootstrap/Table";
import styles from "../../styles/style.module.css";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../App.css";

export const OrderComponent = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Table striped className={styles.table}>
        <thead>
          <tr>
            <th>نام کاربر</th>
            <th>مجموع مبلغ</th>
            <th>زمان ثبت سفارش</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => {
            const { username, id, lastname, prices, createdAt } = order;
            return (
              <tr key={id}>
                <td>{username + " " + lastname}</td>
                <td>{prices}</td>
                <td>{createdAt}</td>
                <td>
                  <a href="#">بررسی سفارش</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="بعدی >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< قبلی"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};
