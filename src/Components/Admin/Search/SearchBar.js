import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../API/UserAPI";
import "../../../App.css";

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

  const search = () => {
    if (show) {
      navigate(`/ADMIN/shifts/${user.id}`)
    }
  }

  useEffect(() => {
    search();
  }, [show]);

  return (
    <div>
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
          <Button variant="dark" onClick={handleClick}>
            Search
          </Button>
        </Form>
      </div>
            {error !== "" && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBar;
