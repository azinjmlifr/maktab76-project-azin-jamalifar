import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
// const root = ReactDOM.createRoot(document.getElementById("root"));
import { Provider } from "react-redux";
import { StrictMode } from "react";
// import store from "./redux/store";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </StrictMode>
);
