import { useNavigate } from "react-router-dom";
import "../../styles/card.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardItem({ name, image, price, off, id, category, description }) {
  const navigate = useNavigate();
  const persianNumber = (x) => {
    return x.toLocaleString("fa-IR");
  };
  return (
    // <div
    //   style={{ backgroundColor: "red" }}
    //   onClick={() => navigate(`/${category}/${id}`)}
    //   // className="bg-white b-shadow ml-6 relative text-[#013662] rounded-xl h-[380px]  mt-5"
    // >
    //   <img
    //     src={`http://localhost:8000/products/${image}`}
    //     // className="mt-2 h-[50%] mx-5 w-[80%] "
    //   />
    //   <div>
    //     <p> {name} </p>

    //     {off !== "0" ? (
    //       <>
    //         <div>{persianNumber(+price)}</div>
    //         <p>{persianNumber((price * off) / 100)}</p>
    //         <span>تومان</span>
    //       </>
    //     ) : (
    //       <p>{persianNumber(+price)} تومان</p>
    //     )}
    //     <button> خرید </button>
    //     <p> بیشتر </p>
    //   </div>
    // </div>
    <Card
      style={{
        width: "20rem",
        margin: "10px",
      }}
      onClick={() => navigate(`/${category}/${id}`)}
    >
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Title>{category}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{persianNumber(+price)}</Card.Text>
        <Button variant="primary">خرید</Button>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
