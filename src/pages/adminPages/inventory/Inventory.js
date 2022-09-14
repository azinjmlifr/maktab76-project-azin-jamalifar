// import React, { useEffect, useState } from "react";
// import { InventoryComponent } from "../../../components/inventory";
// import axios from "axios";
// import Button from "react-bootstrap/Button";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 7;
//   const URL = "http://localhost:8000/";

//   useEffect(() => {
//     const getProduct = async () => {
//       setLoading(true);
//       //   axios
//       //     .get(`http://localhost:8000/products`)
//       //     .then((res) => {
//       //       const data = res.data;
//       //       setProducts(data);
//       //       setLoading(false);
//       //     })
//       //     .catch((err) => console.log("error:" + err));
//       // };
//       await axios
//         .get(`${URL}products`)
//         .then((res) => {
//           setProducts(res.data);
//           setLoading(false);
//           setTotal(res.headers["x-total-count"]);
//         })
//         .catch((err) => console.log("error:" + err));
//     };
//     getProduct();
//   }, []);

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
//       <div>
//         <Button variant="primary">ذخیره</Button>
//       </div>
//       <div>
//         <InventoryComponent
//           data={products}
//           loading={loading}
//           pageCount={currentPage}
//         />
//       </div>
//     </>
//   );
// };

// export default ProductManagement;

import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import { HiOutlineSave } from "react-icons/hi";
import { EditText } from "react-edit-text";
import axiosInstance from "../../../api/http";

const InStockAndPriceTable = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [newPrice, setNewPrice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let limit = 4;

  const fetchProducts = useCallback(
    async (currentPage) => {
      const res = await fetch(
        `http://localhost:8000/products?_page=${currentPage}&_limit=${limit}`
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
    fetchProducts(1);
  }, [fetchProducts]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    fetchProducts(currentPage);
  };
  //price
  const handleChangePrice = (e, id) => {
    const idx = items.findIndex((item) => item.id === id);
    const newPost = [...items];
    newPost[idx].price = e.target.value;
    setItems(newPost);
    const newPriceList = [...newPrice];
    const newIdx = newPrice.findIndex((item) => item.id === id);
    if (newIdx === -1) {
      const newObject = {
        id: id,
        newValPrice: e.target.value,
        newValQuantity: newPost[idx].quantity,
      };
      newPriceList.push(newObject);
    } else {
      newPriceList[newIdx].newValPrice = e.target.value;
    }
    setNewPrice(newPriceList);
  };
  //quantity
  const handleChangeQuantity = (e, id) => {
    const idx = items.findIndex((item) => item.id === id);
    const newPost = [...items];
    newPost[idx].quantity = e.target.value;
    setItems(newPost);
    const newQuantityList = [...newPrice];
    const newIdx = newPrice.findIndex((item) => item.id === id);
    if (newIdx === -1) {
      const newObject = {
        id: id,
        newValPrice: newPost[idx].price,
        newValQuantity: e.target.value,
      };
      newQuantityList.push(newObject);
    } else {
      newQuantityList[newIdx].newValQuantity = e.target.value;
    }

    setNewPrice(newQuantityList);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    console.log(newPrice);
    newPrice.forEach((element) => {
      try {
        let updatedObject = {
          price: element.newValPrice,
          quantity: element.newValQuantity,
        };
        axiosInstance
          .patch(`http://localhost:8000/products/${element.id}`, updatedObject)
          .then((res) => {
            console.log(res);
            fetchProducts(currentPage);
          });
      } catch (error) {
        console.log("error!");
      }
    });
  };

  return (
    <div>
      <Button
        onClick={(e) => saveEdit(e)}
        style={{ margin: "20px", alignItems: "start" }}
        variant="secondary"
        type="submit"
      >
        ذخیره
        <HiOutlineSave />
      </Button>

      <Table
        style={{
          backgroundColor: "white",

          textAlign: "center",
          marginRight: "350px",
        }}
        striped
        bordered
        rounded
        className="w-50 "
      >
        <thead>
          <tr className="head">
            <th>کالا</th>
            <th>قیمت </th>
            <th>موجودی </th>
          </tr>
        </thead>

        {items.length > 0
          ? items?.map((item, i) => (
              <thead key={item.id}>
                <tr>
                  <td>{item?.name}</td>

                  <td>
                    <EditText
                      value={` ${item?.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                      onChange={(e) => handleChangePrice(e, item.id)}
                    />
                  </td>

                  <td>
                    <EditText
                      value={item.quantity}
                      onChange={(e) => handleChangeQuantity(e, item.id)}
                    />
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
export default InStockAndPriceTable;
