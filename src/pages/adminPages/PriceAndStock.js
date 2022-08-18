import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const limit = 7;
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        `http://localhost:8000/products?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      setProducts(data);
    };
    getProduct();
    console.log("first");
  }, []);
  console.log(products);
  return (
    <>
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
            const { name, id, price, quantity } = product;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>{quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProductManagement;
