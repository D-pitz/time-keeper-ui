import React, { useState, useEffect } from "react";
import { endBreakAdmin, startBreakAdmin } from "../../../../API/AdminAPI";
import { endBreak, startBreak } from "../../../../API/BreakAPI";
import { Button } from "react-bootstrap";
import ".././Shift.css";

const StartBreak = ({ user, shift, onEdit }) => {
  const [isAdmin] = useState(user.role === "ADMIN");
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

      case shift.abreak.start === null:
        setIsBreak(false);
        break;

      case shift.abreak.start === null || shift.abreak.complete:
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
      const resp = await endBreakAdmin(shift.shiftId);
      setIsEdit(!isEdit);
    } else {
      const resp = await endBreak(shift.shiftId);
      setIsEdit(!isEdit);
    }
  };

  useEffect(() => {
    validStartBreak();
  }, [isEdit, shift.abreak.start, shift.lunch.start, shift.abreak.end]);

  return (
    <>
      {isBreak ? (
        <Button variant="danger" onClick={handleClick}>
          End
        </Button>
      ) : (
        shift.abreak.end
      )}
    </>
  );
};

export default StartBreak;
