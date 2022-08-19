import React, { useEffect, useState } from "react";
import { ProductManagmentComponent } from "../../../components/productManagment";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(7);
  const limit = 7;
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/products?_page=1`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
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

// import Table from "react-bootstrap/Table";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);

//   const limit = 7;
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       const res = await fetch(`http://localhost:8000/products`);
//       const data = await res.json();
//       setProducts(data);
//       setLoading(false);
//     };
//     fetchProduct();
//   }, []);

//   return (
// <>
//   <Table striped bordered hover variant="dark">
//     <thead>
//       <tr>
//         <th>kala</th>
//         <th>qeimat</th>
//         <th>mojodi</th>
//       </tr>
//     </thead>
//     <tbody>
//       {products.map((product, index) => {
//         const { name, id, quantity, price } = product;
//         return (
//           <tr key={id}>
//             <td>{name}</td>
//             <td>{quantity}</td>
//             <td>{price}</td>
//           </tr>
//         );
//       })}
//     </tbody>
//   </Table>
// </>
//   );
// };

// export default ProductManagement;
