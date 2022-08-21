import React, { useEffect, useState } from "react";
import { getUserShifts } from "../../../../API/ShiftAPI";
import { getActiveUser } from "../../../../Context/UserContext";

const Shifts = ({ active }) => {
  const [user] = useState(getActiveUser());
  const [shifts, setShifts] = useState({});
  const [hasShifts, setHasShifts] = useState(false);

  const getShifts = async () => {
    const resp = await getUserShifts(user.id);
    setShifts(resp.data);
    if (resp.data.length > 0) {
      setHasShifts(true);
    }
    return resp.data;
  };
  useEffect(() => {
    getShifts();
  }, [active]);
  return (
    <>
      {hasShifts &&
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
        ))}
    </>
  );
};

export default Shifts;
