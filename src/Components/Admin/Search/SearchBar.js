import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../API/UserAPI";
import "../../../App.css";
import Shift from "../../Login/Shift/Shift";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleClick = async (e) => {
    try {
      console.log(searchInput);
      if (searchInput === "") {
        return setError("Input required");
      }
      const resp = await getUser(searchInput);
      if (resp.data.error) {
        setError(resp.data.message);
      } else {
        setUser(resp.data);
        setShow(!show);
      }
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  useEffect(() => {}, []);
  if (show) {
    console.log(user.id);
    // navigate(`/ADMIN/shifts/${user.id}`)
    return <Shift admin={props.admin} user={user} />;
  }
  return (
    <div>
      {error !== "" && <p className="error-message">{error}</p>}
      <div className="Search">
        <Form className="Search" placeholder="SearchById">
          <input
            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            value={searchInput}
            onChange={handleChange}
            type="search"
            name="searchInput"
            placeholder="Search By Id"
          />
          <Button class="btn btn-primary" onClick={handleClick}>
            Search
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
