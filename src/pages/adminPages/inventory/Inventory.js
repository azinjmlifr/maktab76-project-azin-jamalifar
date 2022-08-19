import React, { useEffect, useState } from "react";
import { InventoryComponent } from "../../../components/inventory";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 7;
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/products?_page=1`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
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
