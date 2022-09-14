import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/style.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ButtonGroup } from "@mui/material";

function CardInfo() {
  const { id } = useParams();
  const URL = "http://localhost:8000/";
  const [card, setCard] = useState([]);
  const regex = /(<([^>]+)>)/gi;
  const cardFromLocalStorage = JSON.parse(
    localStorage.getItem("basketCount") || "[]"
  );
  const [basketCount, setBasketCount] = useState(cardFromLocalStorage);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getCard();
  }, []);

  const getCard = () => {
    axios
      .get(`${URL}products?id=${id}`)
      .then((res) => {
        setCard(res.data);
      })
      .catch((err) => console.log("error:" + err));
  };

  // useEffect(() => {
  //   dispatch(getProduct());
  //   dispatch(getCategory());
  // }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("basketCount", JSON.stringify(basketCount));
  }, [basketCount]);

  const handlePlusCounter = (item) => {
    counter < item.quantity ? setCounter(counter + 1) : setCounter(counter);
  };
  const handleMinusCounter = () => {
    counter > 0 ? setCounter(counter - 1) : setCounter(1);
  };
  const addtobasket = (item) => {
    const countItems = basketCount.find((data) => data.id === item.id);
    if (countItems) {
      setBasketCount(
        basketCount.map((data) =>
          item.id === data.id
            ? { ...countItems, count: countItems.quantity + counter }
            : data
        )
      );
    } else {
      setBasketCount([...basketCount, { ...item, count: counter }]);
    }
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
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <p> موجودی: </p>
                      </div>
                      <div>
                        {" "}
                        <p> {el.quantity} </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <p>قیمت:</p>
                      <p>
                        {" "}
                        {` ${el?.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}
                      </p>
                    </div>
                  </div>
                </div>
                <div>{el.description.replace(regex, "")} </div>
                {/* <Link to="/basket"> */}
                <div
                  style={{
                    height: "50px",
                    marginLeft: "20px",
                    direction: "ltr",
                  }}
                  variant="contained"
                  aria-label="outlined secondary button group"
                >
                  <Button
                    style={{ backgroundColor: "#66635d" }}
                    onClick={() => handleMinusCounter()}
                  >
                    -
                  </Button>
                  <div>{counter}</div>

                  <Button
                    style={{ backgroundColor: "#66635d" }}
                    onClick={() => handlePlusCounter(el)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="outline-success"
                  style={{ marginTop: "20px" }}
                  disabled={el.quantity === 0 ? true : false}
                  onClick={() => addtobasket(el)}
                >
                  {" "}
                  اضافه کردن به سبد خرید
                </Button>{" "}
                {/* </Link> */}
                <div style={{ marginTop: "20px" }}>
                  {" "}
                  <Link to="/">
                    <Button variant="outline-primary">صفحه اصلی</Button>{" "}
                  </Link>{" "}
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <img
                  src={`http://localhost:8000/files/${el.image}`}
                  style={{ width: "400px", height: "400px" }}
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
