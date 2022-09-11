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
          <Container className={styles.cardInfoContainer}>
            <div style={{ width: "50%" }}>
              {/* <img src={`http://localhost:3001/files/${el.thumbnail}`} className='b-shadow h-[300px] rounded-lg'/> */}
            </div>
            <div style={{ width: "50%" }}>
              <div style={{ height: "200px" }}>
                <p style={{ fontSize: "x-large" }}> {el.name} </p>
                <div className="flex flex-col justify-center items-center">
                  <p> موجودی:{el.Price} </p>
                  <p> {el.quantity} </p>
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

              <div> {el.description} </div>
            </div>
          </Container>
        );
      })}
    </div>
  );
}

export default CardInfo;
