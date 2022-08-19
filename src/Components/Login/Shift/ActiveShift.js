import React, { forwardRef, useEffect, useState } from "react";
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
} from "./ActiveShiftValidator";
import { endLunch, startLunch } from "../../../API/LunchAPI";
import { endBreak, startBreak } from "../../../API/BreakAPI";
import Shift from "./Shift";
import { startShiftAdmin } from "../../../API/AdminAPI";
import { render } from "@testing-library/react";
import ShiftTable from "./ShiftTable";
import { Navigate, useNavigate } from "react-router-dom";

const ActiveShift = (props) => {
    const navigate = useNavigate();

    class Shift {
        constructor() {
          this.shiftId = props.shift.shiftId;
          this.start = props.shift.start;
          this.end = props.shift.end;
          this.lunch = props.shift.lunch;
          this.abreak = props.shift.abreak;
        }
    }

    const [shift, setShift] = useState(new Shift());

    const [user, setUser] = useState(getActiveUser());

    const [editShift, setEditShift] = useState(false);
    const [isStartLunch, setIsStartLunch] = useState(validStartLunch(shift));
    const [isLunch, setIsLunch] = useState(validEndLunch(shift));
    const [isBreak, setIsBreak] = useState(validEndBreak(shift));
    const [isStartBreak, setIsStartBreak] = useState(validStartBreak(shift));
    const [isEndShift, setIsEndShift] = useState(validEndShift(shift));
    const [isAdmin, setIsAdmin] = useState(user.role === "ADMIN");

    const callStartLunch = async (e) => {
        const resp = await startLunch(shift.shiftId);
        setShift(resp.data)
        setEditShift(!editShift)
      };
    
      const callEndLunch = async (e) => {
        const resp = await endLunch(shift.shiftId);
        setShift(resp.data);
        render (<ShiftTable />)
        setEditShift(!editShift)
      }
    
      const callStartBreak = async (e) => {
        const resp = await startBreak(shift.shiftId)
          setShift(resp.data)
          setEditShift(!editShift)
        };
        
        const callEndBreak = async (e) => {
          const resp = await endBreak(shift.shiftId)
          .then(resp => {
            setShift(resp.data);
            React.forwardRef(ShiftTable)
            setEditShift(!editShift);
          })
        
        // render(<ShiftTable />)
      };

      const callEndShift = async (e) => {
        const resp = await endShift(shift.shiftId);
        setEditShift(!editShift);
        setIsBreak(true);
        setIsLunch(true);
        setIsEndShift(true);
        setShift(new Shift());
        // navigate("/shifts")
        forwardRef(ShiftTable)
      };

      useEffect(() => {

      }, [render])
  return (
    <tr className="Row">
      <td className="Col">
        {shift.shiftId}
      </td>
      <td className="Col">{shift.start} </td>
      <td className="Col">
        {shift.end || (
          <Button variant="danger" hidden={isEndShift} onClick={callEndShift}>
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
          <Button variant="danger" hidden={isLunch} onClick={callEndLunch}>
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
          <Button variant="danger" hidden={isBreak} onClick={callEndBreak}>
            Start
          </Button>
        )}
      </td>
    </tr>
  );
};

export default ActiveShift;
