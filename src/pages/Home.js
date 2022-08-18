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
    console.log("first");
  }, []);
  console.log(products);
  return (
    <div className={styles.container}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const { name, id, category } = product;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{category}</td>
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
