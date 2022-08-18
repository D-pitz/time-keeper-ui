import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getUserShifts, startShift } from "../../../API/ShiftAPI";
import { getActiveUser, userObj } from "../../../Context/UserContext";
import "../../../App.css";
import "./Shift.css";
import { ShiftObj } from "../../../Context/ShiftContext";
import ShiftTable from "./ShiftTable";

const Shift = () => {
  const [user, setUser] = useState(getActiveUser());
    
  return (
    <div className="defaultContainer">
      <h4 className="userInfo"> User ID: {user.id}</h4>
      <ShiftTable />
    </div>
  );
};

export default Shift;
