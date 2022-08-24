import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { endShift, getActiveShift } from "../../../../API/ShiftAPI";
import { getActiveUser } from "../../../../Context/UserContext";
import StartLunch from "../Buttons/StartLunch";
import EndLunch from "../Buttons/EndLunch";
import EndBreak from "../Buttons/EndBreak";
import Shifts from "./Shifts";
import Active from "../Buttons/Active";
import ShiftHead from "./ShiftHead";
import StartBreak from "../Buttons/StartBreak";
import "../../../../App.css";
import "../Shift.css";

const ShiftTable = (props) => {
  class Shift {
    constructor() {
      this.shiftId = null;
      this.start = null;
      this.end = null;
      this.lunch = { start: null, end: null, complete: false };
      this.abreak = { start: null, end: null, complete: false };
    }
  }

  const [shift, setShift] = useState(new Shift());

  const [errorMessage, setErrorMessage] = useState("");

  const [editShift, setEditShift] = useState(false);
  const [isActiveShift, setIsActiveShift] = useState(false);
  const [isEndShift, setIsEndShift] = useState(true);
  const [shifts, setShifts] = useState(true);
  const [desc, setDesc] = useState(true);
  const [isAdmin] = useState(props.admin !== undefined);
  const [isUser] = useState(props.user !== undefined);
  const [admin, setAdmin] = useState(props.admin);

  const callGetActiveShift = async () => {
    const resp = await getActiveShift(props.user.id);
    if (resp.data.error) {
      setShift(new Shift());
      setIsActiveShift(false);
      setErrorMessage(resp.data.message);
    } else {
      setIsActiveShift(true);
      setErrorMessage("");
      setShift(resp.data);
      if (resp.data.abreak.complete && resp.data.lunch.complete) {
        setIsEndShift(false);
      }
    }
  };

  const callEndShift = async (e) => {
    const resp = await endShift(shift.shiftId);
    setEditShift(!editShift);
    setIsActiveShift(false);
    setIsEndShift(true);
  };

  const shiftsDesc = (e) => {
    setDesc(!desc);
  };

  const onEdit = () => {
    setEditShift({ ...editShift, editShift: !editShift });
  };

  useEffect(() => {
    callGetActiveShift();
  }, [editShift, isAdmin]);

  return (
    <div className="tableContainer">
      {isUser && isAdmin && (
        <p className="info-message">
          User: {props.user.id} {props.user.role}
        </p>
      )}
      <div className="Filter">
        <div>
          {errorMessage !== "" && (
            <p className="error-message">{errorMessage}</p>
          )}
          {!isActiveShift && (
            <Active
              setShift={setShift}
              setEditShift={setEditShift}
              user={props.user}
            />
          )}
        </div>
        {isAdmin && (
          <p className="info-message">
            Filter:{" "}
            <Button variant="info" onClick={(e) => shiftsDesc(e)}>
              {desc ? "Desc" : "Asc"}
            </Button>
          </p>
        )}
      </div>
      <Table className="Table">
        <thead>
          <ShiftHead />
        </thead>
        <tbody>
          {isActiveShift && (
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
                <StartLunch user={props.user} shift={shift} onEdit={onEdit} />
              </td>
              <td className="Col">
                <EndLunch user={props.user} shift={shift} onEdit={onEdit} />
              </td>
              <td className="Col">
                <StartBreak user={props.user} shift={shift} onEdit={onEdit} />
              </td>
              <td className="Col">
                <EndBreak user={props.user} shift={shift} onEdit={onEdit} />
              </td>
            </tr>
          )}
          <>
            {shifts && (
              <Shifts active={isActiveShift} desc={desc} props={props} />
            )}
          </>
          <Button variant="primary" onClick={(e) => setShifts(!shifts)}>
            {shifts ? "Hide" : "Show All Shifts"}
          </Button>
        </tbody>
      </Table>
    </div>
  );
};

export default ShiftTable;
