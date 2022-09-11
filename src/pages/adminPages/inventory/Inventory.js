import React, { useEffect, useState } from "react";
import { InventoryComponent } from "../../../components/inventory";
import axios from "axios";
import Button from "react-bootstrap/Button";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 7;
  const URL = "http://localhost:8000/";

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      //   axios
      //     .get(`http://localhost:8000/products`)
      //     .then((res) => {
      //       const data = res.data;
      //       setProducts(data);
      //       setLoading(false);
      //     })
      //     .catch((err) => console.log("error:" + err));
      // };
      await axios
        .get(`${URL}products`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
          setTotal(res.headers["x-total-count"]);
        })
        .catch((err) => console.log("error:" + err));
    };
    getProduct();
  }, []);

  const editQuantity = async (event, id) => {
    await fetch(`http://localhost:8000/products/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Content: "application/json",
      },
      body: JSON.stringify({ price: editQuantity.target.value }),
    });
  };
  return (
    <>
      <div>
        <Button variant="primary">ذخیره</Button>
      </div>
      <div>
        <InventoryComponent
          data={products}
          loading={loading}
          pageCount={currentPage}
        />
      </div>
    </>
  );
};

export default ProductManagement;
