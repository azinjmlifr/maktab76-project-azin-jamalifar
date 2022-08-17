import Footer from "./footerHomeLayout";
import { Header } from "./headerHomeLayout";
import { Outlet } from "react-router";

function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout;
