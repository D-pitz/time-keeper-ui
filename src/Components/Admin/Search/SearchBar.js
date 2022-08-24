import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Form>
      <input
        type="search"
        placeholder="Search User Id"
        onChange={handleChange}
        value={searchInput}
      />
    </Form>
  );
};

export default SearchBar;
