import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../API/AdminAPI";
import "../../App.css";
import { getActiveUser } from "../../Context/UserContext";
import DeleteUser from "./Buttons/DeleteUser";
import SearchBar from "./Search/SearchBar";

const AllUsers = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [admin] = useState(getActiveUser());
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const getUsers = async () => {
    const resp = await getAllUsers();
    setUsers(resp.data);
  };

  const handleClick = (u) => {
    navigate(`/shifts/${u.id}`)
  };

  const onShow = (e) => {
    setShow(!show);
  }

  useEffect(() => {
    getUsers();
  }, [show, message, path]);

  return (
    <div className="defaultContainer">
      <div className="Filter">
        <div>
          <h4 className="info-message"> User: {admin.id}</h4>
          <h4 className="info-message"> {admin.role}</h4>
        </div>
        <h2>Users</h2>
        <SearchBar />
      </div>
      <div className="tableContainer">
        <Table striped bordered hover className="Table">
          <thead>
            <tr>
              <td>User Id</td>
              <td>Role</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr className="Row" key={u.id}>
                <td className="Col">{u.id}</td>
                <td className="Col">{u.role}</td>
                <td className="Col">
                  <ButtonGroup>
                    <Button
                      variant="outline-dark"
                      onClick={() => handleClick(u)}
                    >
                      Show Shifts
                    </Button>
                    <DeleteUser user={u} onShow = {onShow} setMessage={setMessage} />
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsers;
