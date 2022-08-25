import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getActiveUser, logout } from "../../Context/UserContext";
import clock from "../../images/clock.png";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  let userData = getActiveUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const callLogout = (e) => {
    logout();
    userData = null;
    setIsActive(false);
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (getActiveUser() !== null) {
      setIsActive(true);
      setIsAdmin(userData.role === "ADMIN");
    } else {
      setIsActive(false);
    }
  }, [isActive, path]);
  return (
    <nav className="Nav-component">
      <div className="logo">
        <img src={clock} alt="#" height={50} width={50} />
        <h4>Time Keeper</h4>
      </div>
      <ul className="NavMenu">
        <div className="Active">
          {isActive && isAdmin ? (
            <>
              <li className="NavItem">
                <Link to={`/shifts/${userData.id}`} className="NavLink">Your Shifts</Link>
              </li>
              <li className="NavItem">
                <Link to='/register' className="NavLink">Create</Link>
              </li>
              <li>
                <Link to="/ADMIN/users" className="NavLink">Users</Link>
              </li>
              <li className="NavItem">
                <Link to="/login" onClick={callLogout} className="NavLink">Logout</Link>
              </li>
            </>
          ) : (
            <>
            {isActive &&
              <li className="NavItem">
              <Link to="/login" onClick={callLogout} className="NavLink">
              Logout
              </Link>
              </li>
            }
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
