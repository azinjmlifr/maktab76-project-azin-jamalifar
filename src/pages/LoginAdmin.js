import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/user/UserSlice";
import Button from "react-bootstrap/Button";
import adminPic from "../assets/pictures/admin.jpeg";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, isLoggedIn } = useSelector((state) => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  if (isLoggedIn) return <Navigate to="/admin/productManagement" />;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          {error && <h6 className="error">{error}</h6>}
          <h5>مدیریت</h5>
          <div className="form-row">
            <label htmlFor="username" className="form-label">
              نام کاربری
            </label>
            <input
              type="username"
              className="form-input"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password" className="form-label">
              رمز عبور
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="button button-block">
            ورود
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="submit"
            className="btn btn-primary m-5"
          >
            بازگشت به سایت اصلی
          </Button>
        </form>
      </div>
      <div>
        <img
          src={adminPic}
          alt="pic"
          style={{ width: "450px", height: "430px" }}
        />
      </div>
    </div>
  );
}
