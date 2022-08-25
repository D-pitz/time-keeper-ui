import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { deleteUser } from "../../../API/UserAPI";

const DeleteUser = (props) => {
  const handleClick = () => {
    const resp = deleteUser(props.user.id);
    props.setMessage(resp.data);
    props.onShow();
  };

  useEffect(() => {}, []);

  return (
    <Button variant="outline-danger" onClick={handleClick}>
      Delete User
    </Button>
  );
};

export default DeleteUser;
