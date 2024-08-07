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
      <Grid item xs={4} paddingTop="8px">
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
                    fontSize: "20px",
                    width: "64px",
                    height: "32px",
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
