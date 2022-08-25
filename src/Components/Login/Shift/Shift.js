import React, { useEffect, useState } from "react";
import { getActiveUser } from "../../../Context/UserContext";
import ShiftTable from "./Tables/ShiftTable";
import "../../../App.css";
import "./Shift.css";
import { useParams } from "react-router-dom";
import { getUser } from "../../../API/UserAPI";

const Shift = () => {
  const params = useParams();
  const [user, setUser] = useState(getActiveUser());
  const [admin, setAdmin] = useState({});
  const [isAdmin] = useState(getActiveUser().role === "ADMIN");

  const ifAdmin = async () => {
    if (isAdmin) {
      getUserData();
      return setAdmin(getActiveUser())
    }
    setAdmin(null);
  };

  const getUserData = async () => {
    const resp = await getUser(params.id);
    return setUser(resp.data);
  }
  console.log(user)
  useEffect(() => {
    ifAdmin();
  }, [isAdmin]);
  return (
    <div className="defaultContainer">
      {isAdmin ? (
        <>
          <h4 className="info-message"> User: {admin.id}</h4>
          <h4 className="info-message"> {admin.role}</h4>
        </>
      ) : (
        <>
          <h4 className="info-message"> User: {user.id}</h4>
          <h4 className="info-message"> {user.role}</h4>
        </>
      )}
      <ShiftTable user={user} admin={admin} isAdmin={isAdmin} />
    </div>
  );
};

export default Shift;
