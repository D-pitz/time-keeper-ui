import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { startShift } from "../../../../API/ShiftAPI";

const Active = ({ setShift, setEditShift, userId }) => {

  const callStartShift = async () => {
    try {
      const resp = await startShift(userId).then(setEditShift(false));
        setShift(resp.data);
        setEditShift(true);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
  };

  useEffect(() => {}, []);

  return (
    <Button variant="success" onClick={callStartShift}>
      Start Shift
    </Button>
  );
};

export default Active;
