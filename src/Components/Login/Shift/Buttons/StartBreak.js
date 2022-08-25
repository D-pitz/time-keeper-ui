import React, { useState, useEffect } from "react";
import { startBreakAdmin } from "../../../../API/AdminAPI";
import { endBreak, startBreak } from "../../../../API/BreakAPI";
import { Button } from "react-bootstrap";
import ".././Shift.css";

const StartBreak = ({ shift, onEdit, isAdmin }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const validStartBreak = () => {
    switch (true) {
      case isAdmin:
        setIsBreak(true);
        break;

      case shift.start === null:
        setIsBreak(false);
        break;

      case shift.abreak.start !== null:
        setIsBreak(false);
        break;

      case shift.lunch.start !== null && !shift.lunch.complete:
        setIsBreak(false);
        break;

      default:
        setIsBreak(true);
        break;
    }
    onEdit();
  };

  const handleClick = async (e) => {
    if (isAdmin) {
      const resp = await startBreakAdmin(shift.shiftId);
      setIsEdit(!isEdit);
    } else {
      const resp = await startBreak(shift.shiftId);
      setIsEdit(!isEdit);
    }
  };
  useEffect(() => {
    validStartBreak();
  }, [isEdit, shift.abreak.start, shift.lunch.start, shift.lunch.end]);

  return (
    <>
      {isAdmin && (
        <div>
          <Button variant="outline-success" onClick={handleClick}>
            Start Break
          </Button>
        </div>
      )}
      {isBreak && !isAdmin ? (
        <Button variant="success" onClick={handleClick}>
          Start
        </Button>
      ) : (
        <p className="info-message">{shift.abreak.start}</p>
      )}
    </>
  );
};

export default StartBreak;
