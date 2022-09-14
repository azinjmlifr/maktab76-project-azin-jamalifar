import { useNavigate, useParams } from "react-router-dom";
import "../../styles/card.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/style.module.css";

function CardItem({ name, price, id, category, description, image }) {
  const navigate = useNavigate();
  const persianNumber = (x) => {
    return x.toLocaleString("fa-IR");
  };

  console.log("category", category);
  console.log("name", name);
  console.log("description", description);
  console.log("id", id);
  console.log("price", price);
  console.log("image", image);
  const { productId } = useParams();
  const URL = "http://localhost:8000/";
  return (
    <Card
      style={{
        width: "20rem",
        margin: "10px",
        display: "felx",
        alignItems: "center",
        justifyContent: "center",
      }}
      // onClick={() => navigate(`/${category}/${id}`)}
      onClick={() => navigate(`/${category}/${id}`)}
      className={styles.cardProductHome}
    >
      <Card.Img
        style={{ height: "100px", width: "100px" }}
        variant="top"
        src={`${URL}files/${image}`}
      ></Card.Img>

      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Title>{name}</Card.Title>
        <Card.Title>{category}</Card.Title>
        <Card.Text>{description}</Card.Text>

        <Card.Text>{price}</Card.Text>
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
