import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../API/UserAPI";
import "./Register.css";
import "../../App.css";
import { createAdmin } from "../../API/AdminAPI";
import { wait } from "@testing-library/user-event/dist/utils";

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: "",
    role: "EMPLOYEE",
    password: "",
    confirmPw: ""  
  });
  const [error, setError] = useState("");

  const [isAdmin, setIsAdmin] = useState(true);

  const messages = useState({
    ROLE: "Please select role",
    PASSWORD: "Please enter a valid password",
  });

  const create = async () => {
    const res = await createUser(userData);
    console.log(res);
    if (res.data.error !== undefined) {
      setError(res.data.message);
    } else {
      return res.data;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.role === "EMPLOYEE") {
        const userForm = await create();
        alert(`Your user Id is ${userForm.id}`);
        navigate("/login");
      } else if (userData.password === userData.confirmPw) {
        var resp = await createAdmin(userData)
        alert(`Your user Id is ${resp.data.id}`)
        navigate("/login")
        
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkEmployee = (data) => {
    if (userData.role === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (e.target.name === "role") {
      setIsAdmin(e.target.value === "ADMIN");
    }
  };

  useEffect(() => {
    // setIsAdmin(userData.role === "ADMIN")
  }, [navigate]);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Register</h2>
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
          {userData.role === "ADMIN" ? (
            <div>
            <Form.Control
            type="password"
            className="input-group"
            name="password"
            placeholder="Password"
            onChange={onChange}
            />
            <Form.Control
            type="password"
            className="input-group"
            name="confirmPw"
            placeholder="Confirm Password"
            onChange={onChange}
            />
            </div>
            ) : (
            <></>
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
