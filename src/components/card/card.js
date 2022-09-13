import { useNavigate } from "react-router-dom";
import "../../styles/card.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/style.module.css";

function CardItem({
  name,
  price,
  id,
  category,
  description,
  categoryName,
  image,
}) {
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
      onClick={() => navigate(`/${categoryName}/${id}`)}
      className={styles.cardProductHome}
    >
      <Card.Img
        style={{ height: "200px", width: "200px" }}
        variant="top"
        src={`${URL}files/${image}`}
      />

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
          خرید
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
