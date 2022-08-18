import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(7);
  const limit = 7;
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/orders?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProduct();
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
            const { username, id, lastname, prices, createdAt } = product;
            return (
              <tr key={id}>
                <td>{username + " " + lastname}</td>
                <td>{prices}</td>
                <td>{createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProductManagement;
