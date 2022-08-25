import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { endShift, getActiveShift } from "../../../../API/ShiftAPI";
import StartLunch from "../Buttons/StartLunch";
import EndLunch from "../Buttons/EndLunch";
import EndBreak from "../Buttons/EndBreak";
import Shifts from "./Shifts";
import Active from "../Buttons/Active";
import ShiftHead from "./ShiftHead";
import StartBreak from "../Buttons/StartBreak";
import "../../../../App.css";
import "../Shift.css";
import { endShiftAdmin } from "../../../../API/AdminAPI";
import { useParams } from "react-router-dom";

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
  const params = useParams();
  const [shift, setShift] = useState(new Shift());
  const [errorMessage, setErrorMessage] = useState("");

  const [editShift, setEditShift] = useState(false);
  const [isActiveShift, setIsActiveShift] = useState(false);
  const [isEndShift, setIsEndShift] = useState(true);
  const [shifts, setShifts] = useState(false);
  const [desc, setDesc] = useState(props.isAdmin);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser] = useState(props.user !== undefined);

  const callGetActiveShift = async () => {
    const resp = await getActiveShift(params.id);
    if (resp.data.error) {
      setShift(new Shift());
      setIsActiveShift(false);
      setErrorMessage(resp.data.message);
      setIsAdmin(props.isAdmin);
    } else {
      setIsAdmin(props.isAdmin);
      setIsActiveShift(true);
      setErrorMessage("");
      setShift(resp.data);
      if (resp.data.abreak.complete && resp.data.lunch.complete) {
        setIsEndShift(false);
      }
    }
    if (isAdmin) {
      setIsEndShift(false);
    }
  };

  const callEndShift = async (e) => {
    if (isAdmin) {
      await endShiftAdmin(shift.shiftId);
      setEditShift(!editShift);
      setIsActiveShift(false);
      setIsEndShift(true);
    } else {
      await endShift(shift.shiftId);
      setEditShift(!editShift);
      setIsActiveShift(false);
      setIsEndShift(true);
    }
  };

  const shiftsDesc = (e) => {
    setDesc(!desc);
  };

  const onEdit = () => {
    setEditShift({ ...editShift, editShift: !editShift });
  };

  useEffect(() => {
    callGetActiveShift();
  }, [editShift]);

  return (
    <div className="tableContainer">
      {isAdmin && (
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
        <h2>Shifts</h2>
        {isAdmin && (
          <p className="info-message">
            Filter:{" "}
            <Button variant="dark" onClick={(e) => shiftsDesc(e)}>
              {desc ? "Desc" : "Asc"}
            </Button>
          </p>
        )}
      </div>
      <Table striped bordered className="Table">
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
                    variant={isAdmin ? 'outline-danger' : 'danger'}
                    hidden={isEndShift}
                    onClick={callEndShift}
                  >
                    End Shift
                  </Button>
                )}
              </td>
              <td className="Col">
                <StartLunch shift={shift} onEdit={onEdit} isAdmin={isAdmin} />
              </td>
              <td className="Col">
                <EndLunch shift={shift} onEdit={onEdit} isAdmin={isAdmin} />
              </td>
              <td className="Col">
                <StartBreak shift={shift} onEdit={onEdit} isAdmin={isAdmin} />
              </td>
              <td className="Col">
                <EndBreak shift={shift} onEdit={onEdit} isAdmin={isAdmin} />
              </td>
            </tr>
          )}
          <>
            {shifts && (
              <Shifts active={isActiveShift} desc={desc} props={props} />
            )}
          </>
        </tbody>
        <Button
          variant="dark"
          className="Button"
          onClick={(e) => setShifts(!shifts)}
        >
          {shifts ? "Hide" : "Show All Shifts"}
        </Button>
      </Table>
    </div>
  );
};

export default ShiftTable;
