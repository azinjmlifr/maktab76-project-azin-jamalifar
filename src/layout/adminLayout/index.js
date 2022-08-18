import Footer from "./footerAdminLayout";
import { Header } from "./headerAdminLayout";
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
