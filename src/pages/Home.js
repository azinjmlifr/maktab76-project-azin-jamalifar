// import { Outlet } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import styles from "../styles/style.module.css";

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const getProduct = async () => {
//       const res = await fetch(`http://localhost:8000/products`);
//       const data = await res.json();
//       setProducts(data);
//     };
//     getProduct();
//   }, []);

//   return (
//     <div className={styles.container} style={{ direction: "rtl" }}>
//       <Table striped>
//         <thead>
//           <tr>
//             <th>نام کالا</th>
//             <th>قیمت</th>
//             <th>موجودی</th>
//             <th>دسته بندی</th>
//             <th>زیرمجموعه</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => {
//             const {
//               name,
//               id,
//               category,
//               categoryName,
//               quantity,
//               subcategoryName,
//             } = product;
//             return (
//               <tr key={id}>
//                 <td>{name}</td>
//                 <td>{quantity}</td>
//                 <td>{category}</td>
//                 <td>{categoryName}</td>
//                 <td>{subcategoryName}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//       <Outlet />
//     </div>
//   );
// };
// export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import CardItem from "../components/card/card";
import { useNavigate, Outlet, Link } from "react-router-dom";
import styles from "../styles/style.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Home() {
  const URL = "http://localhost:8000/";
  const navigate = useNavigate();
  const [Cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  let [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = () => {
    axios
      .get(`${URL}products`)
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log("error:" + err));
    axios
      .get(`${URL}category`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log("error:" + err));
  };
  console.log(Cards);

  return (
    <Container className={styles.homeContainer}>
      <Row>
        {categories.map((cate) => {
          cardCount = 0;
          return (
            <div className={styles.cardAndCategory}>
              <Col sm={3}>
                <div className={styles.categoryDivHome}>
                  <Link className={styles.categoryName} to={cate.name}>
                    {" "}
                    {cate.name}{" "}
                  </Link>
                </div>
              </Col>
              <Col col={8}>
                <div className={styles.cardsDivHome}>
                  {Cards.map((el) => {
                    if (cate.id == el.category && cardCount <= 2) {
                      cardCount++;
                      return (
                        <CardItem
                          name={el.name}
                          id={el.id}
                          cate={cate.name}
                          price={el.Price}
                          photo={el.thumbnail}
                          off={el.off}
                        />
                      );
                    }
                  })}
                </div>
              </Col>
            </div>
          );
        })}
        <Outlet />
      </Row>
    </Container>
  );
}

export default Home;
