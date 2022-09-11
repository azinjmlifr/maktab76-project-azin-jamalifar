import React, { useEffect, useState } from "react";
import { ProductManagmentComponent } from "../../../components/productManagment";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      axios.get(`http://localhost:8000/products`).then((res) => {
        const data = res.data;
        setProducts(data);
        setLoading(false);
      });
    };
    fetchProduct();
  }, []);

  return (
    <>
      <ProductManagmentComponent data={products} loading={loading} />
    </>
  );
};

export default ProductManagement;
