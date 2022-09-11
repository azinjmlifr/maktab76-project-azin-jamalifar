import React from "react";
import { Link } from "react-router-dom";

const Basket = () => {
  return (
    <div>
      Basket
      <div>
        {" "}
        <Link to="/">
          <button>صفحه اصلی</button>{" "}
        </Link>{" "}
      </div>
    </div>
  );
};

export default Basket;
