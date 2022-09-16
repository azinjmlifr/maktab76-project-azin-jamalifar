import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Orders from "../pages/adminPages/orders/Orders";
import PriceAndStock from "../pages/adminPages/inventory/Inventory";
import ProductManagement from "../pages/adminPages/productManagment/ProductManagement";
import LoginAdmin from "../pages/LoginAdmin";
import HomeLayout from "../layout/homeLayout";
import AdminLayout from "../layout/adminLayout";
import CardInfo from "../components/home/CardInfo";
import Sidebar from "../components/commodity/sidebar";
import Basket from "../pages/basket/basket";
import FinalBasket from "../pages/basket/paymentForm";
import PaymentResult from "../pages/basket/fishingResult";
// import { Bank } from "../pages/Bank";

// const LazyAbout = React.lazy(() => import("./pages/About"));
function MyRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<CardInfo />} />
          <Route path="sidebar" element={<Sidebar />}>
            <Route path=":groupId" />
          </Route>
          <Route path="basket" element={<Basket />} />
        </Route>

        <Route path="finalbasket" element={<FinalBasket />} />
        <Route path="payment" element={<PaymentResult />} />

        <Route path="dashboard" element={<LoginAdmin />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="/admin/orders" element={<Orders />}></Route>
          <Route
            path="/admin/priceAndstock"
            element={<PriceAndStock />}
          ></Route>
          <Route
            path="/admin/productManagement"
            element={<ProductManagement />}
          ></Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoute;
