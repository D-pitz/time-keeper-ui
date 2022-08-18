import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, Alert } from "react-bootstrap";
import {
    endShift,
  getActiveShift,
  getUserShifts,
  startShift,
} from "../../../API/ShiftAPI";
import { getActiveUser, userObj } from "../../../Context/UserContext";
import { ProcessError } from "../../../Context/ShiftContext";
import "../../../App.css";
import "./Shift.css";
import { validEndBreak, validEndLunch, validEndShift, validStartBreak } from "./ActiveShift";
import { endLunch, startLunch } from "../../../API/LunchAPI";
import { endBreak, startBreak } from "../../../API/BreakAPI";

const ShiftTable = () => {
  // let shift = ShiftObj;
  const [user, setUser] = useState(getActiveUser());
  const [shifts, setShifts] = useState([]);
  const [shift, setShift] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const [editShift, setEditShift] = useState(false);
  const [hasShift, setHasShift] = useState(false);
  const [isActiveShift, setIsActiveShift] = useState(false);
  const [isLunch, setIsLunch] = useState(true);
  const [isBreak, setIsBreak] = useState(true);
  const [isStartBreak, setIsStartBreak] = useState(true);
  const [isEndShift, setIsEndShift] = useState(true);

  const NO_SHIFTS = useState("You currently don't have any shifts to display");

  const getShifts = async () => {
    try {
      let resp = await getUserShifts(user.id);
      if (shifts.length > 0) {
        setHasShift(true);
      }
      setShifts(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  const callGetActiveShift = async () => {
    const resp = await getActiveShift(user.id);
    if (resp.data.err) {
      setIsActiveShift(false);
      setHasShift(false);
      setErrorMessage(ProcessError(resp));
    } else {
      setShift(resp.data);
      setIsActiveShift(true);
      setHasShift(true);
      setErrorMessage("");
      setIsStartBreak(validStartBreak(resp.data));
      setIsLunch(validEndLunch(resp.data));
      setIsBreak(validEndBreak(resp.data));
      setIsEndShift(validEndShift(resp.data));
    }
    return resp.data;
  };
  
  const callStartShift = async () => {
    try {
      const resp = await startShift(user.id);
      await getShifts();
      setShift(resp.data);
      setEditShift(true);
    } catch (e) {
      console.log(e);
    }
  };

  const callStartLunch = async (e) => {
    const resp = await startLunch(shift.shiftId);
    console.log(resp);
    setEditShift(true);
  }

  const callEndLunch = async (e) => {
    const resp = await endLunch(shift.shiftId);
    console.log(resp)
    setEditShift(true);
  }

  const callStartBreak = async (e) => {
    const resp = await startBreak(shift.shiftId);
    setEditShift(true);
  }

  const callEndBreak = async (e) => {
    const resp = await endBreak(shift.shiftId);
    setEditShift(true);
  }

  const callEndShift = async (e) => {
    const resp = await endShift(shift.shiftId);
    setEditShift(true);
  }

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
          {hasShift ? (
            shifts.map((s) => (
              <tr className="Row" key={s.shiftId}>
                {isActiveShift ? (
                  <td className="Col">{s.shiftId}</td>
                ) : (
                  <td>
                    <Button variant="success" onClick={callStartShift}>
                      Start Shift
                    </Button>
                  </td>
                )}
                <td className="Col">{s.start || ""} </td>
                <td className="Col">
                  {s.end || (
                    <Button variant="danger" hidden={isEndShift} onClick={callEndShift}>
                      End Shift
                    </Button>
                  )}
                </td>
                <td className="Col">
                  {s.lunch.start || (
                    <Button variant="success" hidden={isStartBreak} onClick={callStartLunch}>
                      Start
                    </Button>
                  )}
                </td>
                <td className="Col">
                  {s.lunch.end || (
                    <Button variant="danger" hidden={isLunch} onClick={callEndLunch}>
                      Start
                    </Button>
                  )}
                </td>
                <td className="Col">
                  {s.abreak.start || (
                    <Button variant="success" hidden={isStartBreak} onClick={callStartBreak}>
                      Start
                    </Button>
                  )}
                </td>
                <td className="Col">
                  {s.abreak.end || (
                    <Button variant="danger" hidden={isBreak} onClick={callEndBreak}>
                      Start
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr className="Row">
                <td className="Col">
                  <Button variant="success" onClick={callStartShift}>
                    Start Shift
                  </Button>
                </td>
                <td className="Col"></td>
                <td className="Col"></td>
                <td className="Col"></td>
                <td className="Col"></td>
                <td className="Col"></td>
                <td className="Col"></td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
      {!hasShift && <p className="error-message"> {NO_SHIFTS}</p>}
    </div>
  );
};

export default ShiftTable;
