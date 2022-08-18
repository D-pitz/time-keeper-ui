import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, Alert } from "react-bootstrap";
import {
  endShift,
  getActiveShift,
  getUserShifts,
  startShift,
} from "../../../API/ShiftAPI";
import { getActiveUser, userObj } from "../../../Context/UserContext";
import { ProcessError, ShiftObj } from "../../../Context/ShiftContext";
import "../../../App.css";
import "./Shift.css";
import {
  validEndBreak,
  validEndLunch,
  validEndShift,
  validStartBreak,
  validStartLunch,
} from "./ActiveShift";
import { endLunch, startLunch } from "../../../API/LunchAPI";
import { endBreak, startBreak } from "../../../API/BreakAPI";
import Shift from "./Shift";

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
  const [shifts, setShifts] = useState([]);
  const [shift, setShift] = useState(new Shift());

  const [errorMessage, setErrorMessage] = useState("");

  const [editShift, setEditShift] = useState(false);
  const [hasShift, setHasShift] = useState(false);
  const [isActiveShift, setIsActiveShift] = useState(false);
  const [isStartLunch, setIsStartLunch] = useState(false);
  const [isLunch, setIsLunch] = useState(true);
  const [isBreak, setIsBreak] = useState(true);
  const [isStartBreak, setIsStartBreak] = useState(true);
  const [isEndShift, setIsEndShift] = useState(true);

  const NO_SHIFTS = useState("You currently don't have any shifts to display");

  const getShifts = async () => {
    try {
      let resp = await getUserShifts(user.id);
      if (resp.data.length > 0) {
        setHasShift(true);
      } else {
        setHasShift(false);
      }
      setShifts(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const callGetActiveShift = async () => {
    const resp = await getActiveShift(user.id);
    console.log(resp);
    if (resp.data.message) {
      setShift(new Shift())
      setIsActiveShift(false);
      setErrorMessage(resp.data.message);
    } else {
      setShift(resp.data);
      setIsActiveShift(true);
      setErrorMessage("");
      setIsStartLunch(validStartLunch(resp.data));
      setIsStartBreak(validStartBreak(resp.data));
      setIsLunch(validEndLunch(resp.data));
      setIsBreak(validEndBreak(resp.data));
      setIsEndShift(validEndShift(resp.data));
    }
    return resp.data;
};

const callStartShift = async () => {
    try {
        await startShift(user.id).then().then(
            getActiveShift(user.id)
        );
        // setShift(resp.data);
        setEditShift(!editShift);
        setIsActiveShift(true);
        console.log(isActiveShift);
    } catch (e) {
      console.log(e);
    }
  };

  const callStartLunch = async (e) => {
    const resp = await startLunch(shift.shiftId);
    console.log(resp);
    setEditShift(!editShift);
  };

  const callEndLunch = async (e) => {
    const resp = await endLunch(shift.shiftId);
    console.log(resp);
    setEditShift(!editShift);
  };

  const callStartBreak = async (e) => {
    const resp = await startBreak(shift.shiftId);
    setEditShift(!editShift);
  };

  const callEndBreak = async (e) => {
    const resp = await endBreak(shift.shiftId);
    setEditShift(!editShift);
  };

  const callEndShift = async (e) => {
    const resp = await endShift(shift.shiftId);
    setEditShift(!editShift);
    setIsActiveShift(false);
    setIsBreak(true);
    setIsLunch(true);
    setIsEndShift(true);
    setShift(new Shift());
  };

  useEffect(() => {
    callGetActiveShift();
    getShifts();
    if (shifts.length === 0) {
      setHasShift(false);
    } else {
      setHasShift(true);
    }
  }, [editShift]);

  return (
    <div className="tableContainer">
      {errorMessage !== "" && <p className="info-message">{errorMessage}</p>}
      <Table className="Table">
        <thead>
          <tr className="Row">
            <td className="Col">Shift Id</td>
            <td className="Col">Shift Start</td>
            <td className="Col">Shift End</td>
            <td className="Col">Lunch Start</td>
            <td className="Col">Lunch End</td>
            <td className="Col">Break Start</td>
            <td className="Col">Break End</td>
          </tr>
        </thead>
        <tbody>
          {isActiveShift ? (
            <tr className="Row">
              <td className="Col">
                {shift.shiftId || (
                  <Button variant="success" onClick={callStartShift}>
                    Start Shift
                  </Button>
                )}
              </td>
              <td className="Col">{shift.start || ""} </td>
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
                {shift.lunch.start || (
                  <Button
                    variant="success"
                    hidden={isStartLunch}
                    onClick={callStartLunch}
                  >
                    Start
                  </Button>
                )}
              </td>
              <td className="Col">
                {shift.lunch.end || (
                  <Button
                    variant="danger"
                    hidden={isLunch}
                    onClick={callEndLunch}
                  >
                    Start
                  </Button>
                )}
              </td>
              <td className="Col">
                {shift.abreak.start || (
                  <Button
                    variant="success"
                    hidden={isStartBreak}
                    onClick={callStartBreak}
                  >
                    Start
                  </Button>
                )}
              </td>
              <td className="Col">
                {shift.abreak.end || (
                  <Button
                    variant="danger"
                    hidden={isBreak}
                    onClick={callEndBreak}
                  >
                    Start
                  </Button>
                )}
              </td>
            </tr>
          ) : (
            <tr className="Row" key={shift.shiftId}>
                <td className="Col">
                  <Button variant="success" onClick={callStartShift}>
                    Start Shift
                  </Button></td>
                <td className="Col">{shift.start} </td>
                <td className="Col">{shift.end} </td>
                <td className="Col">{shift.lunch.start}</td>
                <td className="Col">{shift.lunch.end}</td>
                <td className="Col">{shift.abreak.start}</td>
                <td className="Col">{shift.abreak.end}</td>
              </tr>
          )}
          {hasShift &&
            shifts.map((s) => (
              <tr className="Row" key={s.shiftId}>
                <td className="Col">{s.shiftId}</td>
                <td className="Col">{s.start} </td>
                <td className="Col">{s.end} </td>
                <td className="Col">{s.lunch.start}</td>
                <td className="Col">{s.lunch.end}</td>
                <td className="Col">{s.abreak.start}</td>
                <td className="Col">{s.abreak.end}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {!hasShift && <p className="error-message"> {NO_SHIFTS}</p>}
    </div>
  );
};

export default ShiftTable;
