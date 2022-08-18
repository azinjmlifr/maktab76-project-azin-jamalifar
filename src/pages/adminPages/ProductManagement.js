import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  // const limit = 7;
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/products`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProduct();
  }, []);
  //Get current products

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>kala</th>
            <th>qeimat</th>
            <th>mojodi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const { name, id, quantity, price } = product;
            return (
              <tr key={id}>
                <td>{name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProductManagement;
