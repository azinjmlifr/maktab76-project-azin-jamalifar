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
      }}
      onClick={() => navigate(`/${categoryName}/${id}`)}
      className={styles.cardProductHome}
    >
      <Card.Img variant="top" src={`${URL}/files/${image}`} />
      <img src={`${URL}/files/${image}`} alt="pc" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Title>{category}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{<img src={`${URL}/files/${image}`} alt="pic" />}</Card.Text>
        <Card.Text>{persianNumber(+price)}</Card.Text>
        <Button variant="primary">خرید</Button>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
