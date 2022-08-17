import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext, UserProvider } from "../../Context/UserContext";
import { activeUser } from "../../App.js"
import clock from "../../images/clock.png"
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  let userData = useContext(UserContext).getActiveUser();
  const logout = useContext(UserContext).logout;
  const callLogout = (e) => {
    logout();
    userData = null;
    setIsActive(false);
    console.log("Logout called")
  }
  const [user, setUser] = useState({
    isLogin: false
  });

  const [isActive, setIsActive] = useState(false);

  let setActiveUser = () => {
    setUser({ userData })
    console.log(isActive);
    setIsActive(true);
  }

  useEffect(() => {
    if (userData === null) {
      setIsActive(false);
    } else {
      setActiveUser();
    }
  }, [UserContext]);   
  return (
    <nav className="Nav-component">
          <div className="logo">
              <img src={clock} alt="#" height={50} width={50} />
              <h4>Time Keeper</h4>
          </div>
        <ul className="NavMenu">
          <div className="navButtons">
          {isActive ? (
              <>
              <li className="NavItem">
                <Button className="NavLink" onClick={callLogout}> Logout </Button>
              </li>
              <li className="NavItem">
                <Link to="/home" className="NavLink">
                  Home
                </Link>
              </li>
              {/* <li>
                <Button onClick={navigate(`/users/${user.id}`)}>
                  Profile
                </Button>
              </li> */}
            </>
          ) : null}
          </div>
        </ul>
    </nav>
  );
};

export default Nav;
