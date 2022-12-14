import React, { useState, useEffect } from "react";
import { startLunchAdmin } from "../../../../API/AdminAPI";
import { startLunch } from "../../../../API/LunchAPI";
import { Button } from "react-bootstrap";
import ".././Shift.css";

const StartLunch = (props) => {
  const [shift, setShift] = useState(props.shift);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  const [isLunch, setIsLunch] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const validStartLunch = () => {
    switch (true) {
      case isAdmin:
        setIsLunch(true);
        break;
      case props.shift.start === null:
        setIsLunch(false);
        break;
      case props.shift.lunch.start !== null:
        setIsLunch(false);
        break;
      case props.shift.abreak.start !== null && !props.shift.abreak.complete:
        setIsLunch(false);
        break;
      default:
        setIsLunch(true);
        break;
    }
    props.onEdit();
  };

  const changeShiftData = (data) => {
    setShift({ ...shift, lunch: data.lunch });
    setIsEdit(!isEdit);
  };

  const handleClick = async (e) => {
    if (isAdmin) {
      const resp = await startLunchAdmin(shift.shiftId);
      changeShiftData(resp.data);
    } else {
      const resp = await startLunch(shift.shiftId);
      changeShiftData(resp.data);
    }
  };

  useEffect(() => {
    validStartLunch();
  }, [
    isEdit,
    props.shift.abreak.start,
    props.shift.abreak.end,
    props.shift.lunch.start,
  ]);

  return (
    <>
      {isAdmin && (
        <div>
          <Button variant="outline-success" onClick={handleClick}>
            Start Lunch
          </Button>
        </div>
      )}
      {isLunch && !isAdmin ? (
        <Button variant="success" onClick={handleClick}>
          Start
        </Button>
      ) : (
        <p className="info-message">{shift.lunch.start}</p>
      )}
    </>
  );
};

export default StartLunch;
