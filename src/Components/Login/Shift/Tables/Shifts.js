import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserShifts } from "../../../../API/ShiftAPI";

const Shifts = ({props, active, desc }) => {
  const params = useParams();
  const [isAdmin] = useState(props.admin !== undefined);
  const [shifts, setShifts] = useState({});
  const [hasShifts, setHasShifts] = useState(false);
  const [message] = useState("You currently dont have any shifts to display.");

  const getShifts = async () => {

    const resp = await getUserShifts(params.id);
    setShifts(resp.data);
    if (desc) setShifts(resp.data.reverse());
    if (resp.data.length > 0) {
      setHasShifts(true);
    } 
    return resp.data;
  };
  useEffect(() => {
    getShifts();
  }, [active, desc]);
  return (
    <>
      {hasShifts ? 
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
        )) : (
          <tr className="Row"> 
            <td className="Col"><p className="error-message">{message}</p></td>
          </tr>
        )
      }
    </>
  );
};

export default Shifts;
