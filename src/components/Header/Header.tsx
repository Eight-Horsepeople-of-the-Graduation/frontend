import React from "react";
import classes from "./Header.module.css";
import SearchBar from "./SearchBar/SearchBar";

const Header = () => {
  return (
    <header className={classes.Header}>
      <SearchBar />
    </header>
  );
};

export default Header;
