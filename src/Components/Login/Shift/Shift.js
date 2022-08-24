import React, { useEffect, useState } from "react";
import { getActiveUser } from "../../../Context/UserContext";
import ShiftTable from "./Tables/ShiftTable";
import "../../../App.css";
import "./Shift.css";


const Shift = (props) => {
  const [admin, setAdmin] = useState(props.admin);
  const [isAdmin, setIsAdmin] = useState(props.admin !== undefined);
  const [user, setUser] = useState(props.user || getActiveUser());

  const ifAdmin = () => {
    if (isAdmin) setUser({ ...user, user: props.user });
  }

  useEffect(() => {
    ifAdmin();
  }, []);
  return (
    <div className="defaultContainer">
      {isAdmin ? (
        <>
         <h4 className="userInfo"> User: {admin.id}</h4>
         <h4 className="userInfo"> {admin.role}</h4>
        </>
         ) : (
          <>
           <h4 className="userInfo"> User: {user.id}</h4>
           <h4 className="userInfo"> {user.role}</h4>
          </>
         )
        }
      <ShiftTable user = {user} admin = {admin} />
    </div>
  );
};

export default Shift;
