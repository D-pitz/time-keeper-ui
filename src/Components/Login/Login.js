import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  getActiveUser,
  UserContext,
  UserProvider,
} from "../../Context/UserContext";
import { login, userLogin } from "../../API/UserAPI";
import Shift from "./Shift/Shift";
import { render } from "@testing-library/react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useContext(UserContext).login;
  const [user, setUser] = useState({
    id: "",
    role: "",
    isLogin: false,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const res = await userLogin(user);
      if (!res.data.error) {
        let userData = res.data;
        user.id = userData.id;
        user.role = userData.role;
        user.isLogin = true;
        login(user);
        navigate("/shifts")
      } else {
        setError(res.data.message);
        // console.log(error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isActive = () => {
    if (getActiveUser() !== undefined) {
      return <Shift />
    }
  };

  const admin = (e) => {
    setIsAdmin(true);
  };

  useEffect(() => {
    isActive();
  }, []);
  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="info">Sign In</h2>
        {error !== "" && <p className="error-message">{error}</p>}
        <Form onSubmit={loginSubmit} className="rounded p4 p-sm-3">
          <Form.Control
            className="input-group"
            type="text"
            value={user.id}
            required
            name="id"
            placeholder="Id"
            onChange={handleChange}
          />
          {isAdmin && (
            <Form.Control
              type="password"
              required
              name="password"
              placeholder="Password"
              className="input-group"
              onChange={handleChange}
            />
          )}
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="med"
              className="login-btn"
              value="login"
              type="submit"
              onClick={loginSubmit}
            >
              Login
            </Button>
            <Button variant="secondary" size="med" onClick={admin}>
              Admin
            </Button>
          </div>
        </Form>
        <div className="info-container">
          <p className="info">
            <Link to="/register" className="Link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
