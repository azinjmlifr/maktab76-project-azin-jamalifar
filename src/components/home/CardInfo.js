import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/style.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function CardInfo() {
  const { id } = useParams();
  const URL = "http://localhost:8000/";
  const [card, setCard] = useState([]);
  const regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    getCard();
  }, []);

  const getCard = () => {
    axios
      .get(`${URL}products?id=${id}`)
      .then((res) => {
        setCard(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("error:" + err));
  };

  return (
    <div className="my-64">
      {card.map((el) => {
        return (
          <Container
            className={styles.cardInfoContainer}
            style={{ marginTop: "100px" }}
          >
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "xx-large",
                  width: "100%",
                  marginBottom: "100px",
                }}
              >
                {" "}
                {el.name}{" "}
              </h1>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                <div style={{ height: "200px" }}>
                  <div className="flex flex-col justify-center items-center">
                    <p> موجودی: </p>
                    <p> {el.quantity} </p>
                    <p>قیمت:</p>
                    <p>
                      {" "}
                      {` ${el?.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}
                    </p>
                    <div>{el.description.replace(regex, "")} </div>
                  </div>
                </div>
                <Link to="/basket">
                  <Button variant="outline-success">
                    {" "}
                    اضافه کردن به سبد خرید
                  </Button>{" "}
                </Link>
                <div>
                  {" "}
                  <Link to="/">
                    <Button variant="outline-success">صفحه اصلی</Button>{" "}
                  </Link>{" "}
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <img
                  src={`http://localhost:8000/files/${el.image}`}
                  className="b-shadow h-[300px] rounded-lg"
                  alt="pic"
                />
              </div>
            </div>
          </Container>
        );
      })}
    </div>
  );
}

export default CardInfo;
