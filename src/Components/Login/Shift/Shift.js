import React, { useEffect, useState } from "react";
import { getActiveShift, getUserShifts } from "../../../API/ShiftAPI";
import { getActiveUser } from "../../../Context/UserContext";
import "../../../App.css";
import "./Shift.css";
import ShiftTable from "./ShiftTable";
import StartLunch from "./Buttons/StartLunch";
import Shifts from "./Tables/Shifts";

const Shift = () => {
  const [user, setUser] = useState(getActiveUser());
  class Shift {
    constructor() {
      this.shiftId = null;
      this.start = null;
      this.end = null;
      this.lunch = { start: null, end: null, complete: false };
      this.abreak = { start: null, end: null, complete: false };
    }
  }

  useEffect(() => {
  }, []);
  return (
    <div className="defaultContainer">
      <h4 className="userInfo"> User: {user.id}</h4>
      <h4 className="userInfo"> {user.role}</h4>
      <ShiftTable />
    </div>
  );
};

export default Shift;
