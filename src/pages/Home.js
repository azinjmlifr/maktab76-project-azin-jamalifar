import axios from "axios";
import { useEffect, useState } from "react";
import CardItem from "../components/card/card";
import { useNavigate, Outlet, Link, NavLink } from "react-router-dom";
import styles from "../styles/style.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/pictures/2.jpeg";
// import { useDispatch, useSelector } from "react-redux";
// import { getProduct } from "../redux/ProductSlice";
// import { getCategory } from "../redux/";

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

  return (
    <div style={{ display: "felx" }}>
      <div>
        <div>
          <img
            src={logo}
            alt="pic"
            style={{ width: "1500px", height: "500px" }}
          />
        </div>
      </div>
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
                      {cate.name}
                    </Link>
                    <img
                      src={`${URL}files/${cate.icon}`}
                      alt="pic"
                      style={{ width: "50px", height: "50px" }}
                    />{" "}
                  </div>
                </Col>
                <Col col={8}>
                  <div
                    className={styles.cardsDivHome}
                    style={{ marginBottom: "30px" }}
                  >
                    {Cards.map((el) => {
                      if (cate.id == el.category && cardCount <= 2) {
                        cardCount++;
                        return (
                          <CardItem
                            name={el.name}
                            id={el.id}
                            cate={cate.name}
                            price={el.Price}
                            photo={el.image}
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
    </div>
  );
}

export default Home;
