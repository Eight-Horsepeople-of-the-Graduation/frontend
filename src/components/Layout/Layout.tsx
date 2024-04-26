import React from "react";
import { Grid } from "@mui/material";
import SidePannel from "../SidePannel/SidePannel";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Grid container className={classes.layout}>
      <Grid item xs={9} className={classes.content}>
        {children}
      </Grid>
      <Grid item xs={3} className={classes.sidePannelContainer}>
        <SidePannel />
      </Grid>
    </Grid>
  );
};

export default Layout;
