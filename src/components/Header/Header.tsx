import React from "react";
import classes from "./Header.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { Link } from "react-router-dom";
import {
  faHome,
  faBookBookmark,
  faBarsProgress,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const navItems = [
    { icon: faHome, text: "Home", link: "/" },
    { icon: faBookBookmark, text: "Library", link: "/library" },
    { icon: faBarsProgress, text: "Challenges", link: "/challenges" },
  ];
  return (
    <Grid className={classes.Header} role="heading" container>
      <Grid item xs={4} paddingTop="16px">
        <SearchBar />
      </Grid>

      <Grid item xs={4} justifyContent="space-between">
        <Grid container role="navigation" padding="8px 0">
          {navItems.map((item) => (
            <Grid item key={item.text} xs={4}>
              <Link
                to={item.link}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  sx={{
                    fontSize: "24px",
                    width: "128px",
                    height: "48px",
                  }}
                  color="primary"
                  title={item.text}
                >
                  {<FontAwesomeIcon icon={item.icon} />}
                </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={4}></Grid>
    </Grid>
  );
};

export default Header;
