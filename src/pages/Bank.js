import React from "react";
import bankPic from "../assets/pictures/bank.jpeg";
import { useNavigate } from "react-router-dom";

export const Bank = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={bankPic} alt="bank" />
      <div>
        <button onClick={() => navigate("payment")}>OK</button>
        <button>BAD</button>
      </div>
    </div>
  );
};
