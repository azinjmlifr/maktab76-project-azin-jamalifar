import { useNavigate, useParams } from "react-router-dom";
import "../../styles/card.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/style.module.css";

function CardItem({ name, id, category, image }) {
  const navigate = useNavigate();
  // const persianNumber = (x) => {
  //   return x.toLocaleString("fa-IR");
  // };
  // const { productId } = useParams();
  const URL = "http://localhost:8000/";
  return (
    <Card
      onClick={() => navigate(`/${name}/${id}`)}
      className={styles.cardProductHome}
    >
      <Card.Img
        style={{ height: "100px", width: "100px" }}
        variant="top"
        src={`${URL}files/${image}`}
      ></Card.Img>

      <Card.Body className={styles.card}>
        <Card.Title>{name}</Card.Title>
        {/* <Card.Text>{price}</Card.Text> */}
        <Button
          variant="outline-info"
          style={{
            width: "70%",
          }}
        >
          جزییات بیشتر
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
