import React, { Component, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import {
  endShift,
  getActiveShift,
  getUserShifts,
} from "../../../API/ShiftAPI";
import { getActiveUser } from "../../../Context/UserContext";
import "../../../App.css";
import "./Shift.css";
import {
  validEndBreak,
  validEndLunch,
  validEndShift,
  validStartBreak,
} from "./ActiveShiftValidator";
import { endBreak, startBreak } from "../../../API/BreakAPI";
import StartLunch from "./Buttons/StartLunch";
import EndLunch from "./Buttons/EndLunch";
import EndBreak from "./Buttons/EndBreak";
import Shifts from "./Tables/Shifts";
import Active from "./Buttons/Active";
import ShiftHead from "./Tables/ShiftHead";
import { endLunch, startLunch } from "../../../API/LunchAPI";
import StartBreak from "./Buttons/StartBreak";
import { render } from "@testing-library/react";

const ShiftTable = () => {

  class Shift {
    constructor() {
      this.shiftId = null;
      this.start = null;
      this.end = null;
      this.lunch = { start: null, end: null, complete: false };
      this.abreak = { start: null, end: null, complete: false };
    }
  }

  const [user, setUser] = useState(getActiveUser());
  const [shift, setShift] = useState(new Shift());

  const [errorMessage, setErrorMessage] = useState("");

  const [editShift, setEditShift] = useState(false);
  const [isActiveShift, setIsActiveShift] = useState(false);
  const [isEndShift, setIsEndShift] = useState(true);
  const [shifts, setShifts] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.role === "ADMIN");

  const callGetActiveShift = async () => {
    const resp = await getActiveShift(user.id);
    if (resp.data.error) {
      setShift(new Shift());
      setIsActiveShift(false);
      setErrorMessage(resp.data.message);
    } else {
      setIsActiveShift(true);
      setErrorMessage("");
      setShift(resp.data);
      shiftValid(resp.data);
    }
  };

  const shiftValid = (shift) => {
    setIsActiveShift(shift.id !== null);
    setIsEndShift(validEndShift(shift));
  };

  const callEndShift = async (e) => {
    const resp = await endShift(shift.shiftId);
    setEditShift(!editShift);
    setIsActiveShift(false);
    setIsEndShift(true);
  };

  const onEdit = () => {
    setEditShift({...editShift, editShift: !editShift})
  }

  useEffect(() => {
    callGetActiveShift();
  }, [editShift]);

  return (
    <div className="tableContainer">
      {errorMessage !== "" && <p className="info-message">{errorMessage}</p>}
      { !isActiveShift && 
        <Active setShift = {setShift} setEditShift = {setEditShift} userId = {user.id} /> 
      }
      <Table className="Table">
        <thead>
          <ShiftHead />
        </thead>
        <tbody>
          {isActiveShift ? (
            <tr className="Row">
              <td className="Col"> {shift.shiftId} </td>
              <td className="Col">{shift.start} </td>
              <td className="Col">
                {shift.end || (
                  <Button
                    variant="danger"
                    hidden={isEndShift}
                    onClick={callEndShift}
                  >
                    End Shift
                  </Button>
                )}
              </td>
              <td className="Col">
                <StartLunch user = {user} shift = {shift} onEdit = {onEdit} />
              </td>
              <td className="Col">
                <EndLunch user = {user} shift = {shift} onEdit = {onEdit} />
              </td>
              <td className="Col">
                <StartBreak user = {user} shift = {shift} onEdit = {onEdit} />
              </td>
              <td className="Col">
                  <EndBreak user = {user} shift = {shift} onEdit = {onEdit} />
              </td>
            </tr>
          ) : (
            <></>
          )}
          { shifts && <Shifts active = {isActiveShift}/> }
          <Button variant = "info" onClick= {() => setShifts(!shifts)} >Show All Shifts</Button>
        </tbody>
      </Table>
    </div>
  );
};

export default ShiftTable;
