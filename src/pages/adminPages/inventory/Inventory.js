import React, { useEffect, useState } from "react";
import { InventoryComponent } from "../../../components/inventory";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 7;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      axios
        .get(`http://localhost:8000/products`)
        .then((res) => {
          const data = res.data;
          setProducts(data);
          setLoading(false);
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
        <button>ذخیره</button>
      </div>
      <div>
        <InventoryComponent data={products} loading={loading} />
      </div>
    </>
  );
};

export default ProductManagement;
