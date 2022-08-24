import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../API/UserAPI";
import { createAdmin } from "../../API/AdminAPI";
import "./Register.css";
import "../../App.css";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    role: "EMPLOYEE",
    password: "",
    confirmPw: "",
  });
  const [messages] = useState({
    PASSWORD: "Password does not match confirm password",
    PW_REQUIRED: "Password is required",
    CONFIRM_REQUIRED: "Confirm Password is required"
  });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const create = async () => {
    const resp = await createUser(userData);
    console.log(resp);
    if (resp.data.error !== undefined) {
      setError(resp.data.message);
    } else {
      alert(`Your user Id is ${resp.data.id}`);
      navigate("/login");
    }
  };

  const validAdmin = () => {
    let e = ""
    if (userData.confirmPw !== userData.password) e = messages.PASSWORD;
    if (userData.confirmPw === "") e = messages.CONFIRM_REQUIRED;
    if (userData.password === "") e = messages.PW_REQUIRED;
    setError(e);
    return e === ""
  };

  const newAdmin = async () => {
      const resp = await createAdmin(userData);
      if (resp.data.error) {
        setError(resp.data.message);
      } else {
        alert(`Your user Id is ${resp.data.id}`);
        navigate("/login");
      }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isAdmin) {
      if (!validAdmin(e)) return false;
    newAdmin();
    } else {
      create();
    };
  }

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (e.target.name === "role") {
      setIsAdmin(e.target.value === "ADMIN");
    }
  };

  useEffect(() => {}, [navigate, error]);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Register</h2>
        {error !== "" && <p className="error-message">{error}</p>}
        <Form onSubmit={onSubmit} className="rounded p4 p-sm-3">
          <Form.Select
            className="input-group"
            value={userData.role}
            name="role"
            onChange={onChange}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>
          {isAdmin && (
            <div>
              <Form.Control
                type="password"
                className="input-group"
                required
                name="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Form.Control
                type="password"
                className="input-group"
                required
                name="confirmPw"
                placeholder="Confirm Password"
                onChange={onChange}
              />
            </div>
          )}
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="med"
              className="login-btn"
              value="login"
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </Button>
            <Button
              variant="danger"
              size="med"
              onClick={() => navigate("/login")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
