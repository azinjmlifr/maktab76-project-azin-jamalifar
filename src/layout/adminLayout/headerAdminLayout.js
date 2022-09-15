import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "../../styles/style.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IS_LOGGGED_IN } from "../../config/constants";
import Button from "react-bootstrap/Button";

export const Header = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.setItem(IS_LOGGGED_IN, false);
    localStorage.clear();
    navigate("/dashboard");
  };
  return (
    <div className={styles.adminNavbar}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              style={{ textDecoration: "none" }}
            >
              سوپرمارکت
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <NavLink
                  to="/admin/orders"
                  className={`${({ isActive }) =>
                    isActive ? "link active" : "link"} ${styles.navbarText}`}
                >
                  سفارش ها
                </NavLink>
              </Nav.Link>
              <Nav.Link href="#link">
                <NavLink
                  to="/admin/priceAndstock"
                  className={`${({ isActive }) =>
                    isActive ? "link active" : "link"} ${styles.navbarText}`}
                >
                  موجودی و قیمت ها
                </NavLink>
              </Nav.Link>
              <Nav.Link href="#link">
                <NavLink
                  to="/admin/productManagement"
                  className={`${({ isActive }) =>
                    isActive ? "link active" : "link"} ${styles.navbarText}`}
                >
                  کالاها
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button
            onClick={() => {
              handleExit();
            }}
          >
            خروج
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};
