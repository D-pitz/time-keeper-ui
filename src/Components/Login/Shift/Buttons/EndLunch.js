import React, { useState, useEffect } from "react";
import { endLunchAdmin } from "../../../../API/AdminAPI";
import { endLunch } from "../../../../API/LunchAPI";
import { Button } from "react-bootstrap";
import ".././Shift.css";

const EndLunch = ({ user, shift, onEdit }) => {
  const [isAdmin, setIsAdmin] = useState(user.role === "ADMIN");
  const [isEdit, setIsEdit] = useState(false);
  const [isLunch, setIsLunch] = useState(false);

  const validEndLunch = () => {
    switch (true) {
      case isAdmin:
        setIsLunch(true);
        break;

      case shift.start === null:
        setIsLunch(false);
        break;

      case shift.lunch.start === null || shift.lunch.complete:
        setIsLunch(false);
        break;

      case shift.abreak.start !== null && !shift.abreak.complete:
        setIsLunch(false);
        break;

      default:
        setIsLunch(true);
        break;
    }
    onEdit();
  };

  const handleClick = async (e) => {
    if (isAdmin) {
      const resp = await endLunchAdmin(shift.shiftId);
      setIsEdit(!isEdit);
    } else {
      const resp = await endLunch(shift.shiftId);
      setIsEdit(!isEdit);
    }
  };

  useEffect(() => {
    validEndLunch();
  }, [isEdit, shift.abreak.start, shift.lunch.start, shift.lunch.end]);

  return (
    <>
      {isAdmin && (
        <div>
          <Button variant="danger" onClick={handleClick}>
            End Lunch
          </Button>
        </div>
      )}
      {isLunch && !isAdmin ? (
        <Button variant="danger" onClick={handleClick}>
          End
        </Button>
      ) : (
        <p className="info-message">{shift.lunch.end}</p>
      )}
    </>
  );
};

export default EndLunch;
