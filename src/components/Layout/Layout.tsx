import React from "react";
import SidePannel from "../SidePannel/SidePannel";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes.layout}>
      <div className={classes.content}>{children}</div>
      <div className={classes.sidePannelContainer}>
        <SidePannel />
      </div>
    </div>
  );
};

export default Layout;
