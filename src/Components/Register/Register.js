import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../API/UserAPI";
import './Register.css'
import '../../App.css'

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
      id: "",
      role: "EMPLOYEE",
      password: "",
      confirmPw: ""
    });
  const [error, setError] = useState("");

  const [isEmployee, setIsEmployee] = useState(false)

  const messages = useState({
    ROLE: "Please select role",
    PASSWORD: "Please enter a valid password",
  });

  const create = async () => {
    const res = await createUser(user);
    console.log(res)
    if (res.data.error !== undefined) {
      setError(res.data.message);
    } else {
      return res.data;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.role === "EMPLOYEE") {
        const userData = await create();
        alert(`Your user id is ${userData.id}`)
        navigate("/login")
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkEmployee = () => {
    if (user.role === "ADMIN") {
        setIsEmployee(false);
    } else {
        setIsEmployee(true);
    }
    console.log(isEmployee);
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    checkEmployee()
  }

  useEffect(() => {
    
  }, [navigate])

  return (
    <div className="container">
        <div className="form-wrapper">
            <h2>Register</h2>
            <Form onSubmit={onSubmit} className="rounded p4 p-sm-3">
                <Form.Select 
                    className="input-group"
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={onChange}
                >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>
                </Form.Select>
                    <Form.Control
                        type="password"
                        className="input-group"
                        value={user.password}
                        name="password"
                        placeholder="Password"
                        hidden={!isEmployee}
                        onChange={onChange}
                    /> 
                    <Form.Control
                    type="password"
                    className="input-group"
                    value={user.confirmPw}
                    name="confirmPw"
                    placeholder="Confirm Password"
                    hidden={!isEmployee}
                    onChange={onChange}
                    />
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
            <Button variant="danger" size="med" onClick={() => navigate("/login")}>
              Cancel
            </Button>
          </div>
            </Form>
        </div>
    </div>
  )
};

export default Register;
