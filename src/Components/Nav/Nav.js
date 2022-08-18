import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getActiveUser, logout, UserContext, UserProvider } from "../../Context/UserContext";
import { activeUser } from "../../App.js"
import clock from "../../images/clock.png"
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const callLogout = (e) => {
    logout();
    userData = null;
    setIsActive(false);
  }

  let userData = getActiveUser();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (userData === null) {
      setIsActive(false);
    } else {
      setIsActive(true);
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
          {isActive ? (
              <>
              <li className="NavItem">
                <Link to="/home" className="NavLink">
                  Home
                </Link>
              </li>
              <li className="NavItem">
                <Link to="/login" onClick={callLogout} className="NavLink"> 
                  Logout 
                  </Link>
              </li>
            </>
          ) : null}
          </div>
        </ul>
    </nav>
  );
};

export default Nav;
