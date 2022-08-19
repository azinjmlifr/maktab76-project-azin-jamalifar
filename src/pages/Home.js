import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "../styles/style.module.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`http://localhost:8000/products`);
      const data = await res.json();
      setProducts(data);
    };
    getProduct();
  }, []);
  console.log(products);
  return (
    <div className={styles.container} style={{ direction: "rtl" }}>
      <Table striped>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th>دسته بندی</th>
            <th>زیرمجموعه</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const {
              name,
              id,
              category,
              categoryName,
              quantity,
              subcategoryName,
            } = product;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{category}</td>
                <td>{categoryName}</td>
                <td>{subcategoryName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Outlet />
    </div>
  );
};
export default Home;
