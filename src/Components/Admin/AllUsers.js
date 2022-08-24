import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../API/AdminAPI";
import "../../App.css";
import { getActiveUser } from "../../Context/UserContext";
import Shift from "../Login/Shift/Shift";
import SearchBar from "./Search/SearchBar";

const AllUsers = () => {
const navigate = useNavigate();
  const [admin, setAdmin] = useState(getActiveUser());
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const getUsers = async () => {
    const resp = await getAllUsers();
    setUsers(resp.data);
  };

  const handleClick = (user) => {
    setUser(user);
    setShow(!show);
  };

  useEffect(() => {
    getUsers();
  }, [show]);
  if (show) {
    return ( <Shift admin={admin} user={user} /> )
  }
  return (
    <div className="tableContainer">
      <h4 className="userInfo"> User: {admin.id}</h4>
      <h4 className="userInfo"> {admin.role}</h4>
      <SearchBar />
      <Table striped className="Table">
        <thead>
          <tr>
            <td>User Id</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr className="Row" key={u.id}>
              <td className="Col">{u.id}</td>
              <td className="Col">{u.role}</td>
              <td className="Col">
                <Button variant="info" onClick={() => handleClick(u)}>
                  Show Shifts
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllUsers;
