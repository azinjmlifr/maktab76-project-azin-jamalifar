import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Categories from "../pages/Categories";
import Orders from "../pages/Orders";
import AdminSharedLayout from "../pages/AdminSharedLayout";
import PriceAndStock from "../pages/PriceAndStock";
import ProductManagement from "../pages/ProductManagement";
import Basket from "../pages/Basket";
import Dashboard from "../pages/Dashboard";
import HomeLayout from "../layout/homeLayout";
// const LazyAbout = React.lazy(() => import("./pages/About"));
function MyRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path=":categories/:cardInfo" />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="admin" element={<AdminSharedLayout />}>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="priceAndstock" element={<PriceAndStock />}></Route>
          <Route
            path="productManagement"
            element={<ProductManagement />}
          ></Route>
        </Route>{" "}
        <Route path="basket" element={<Basket />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoute;
