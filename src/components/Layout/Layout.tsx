import React, { useRef, useState } from "react";
import SidePannel from "../SidePannel/SidePannel";
import classes from "./Layout.module.css";
import Header from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
  hideOnScrollTo?: number;
}

const Layout = ({ children, hideOnScrollTo }: LayoutProps) => {
  const [hidePannel, setHidePannel] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  contentRef.current?.addEventListener("scroll", () => {
    if (!contentRef.current) return;

    if (hideOnScrollTo && contentRef.current.scrollTop > hideOnScrollTo) {
      setHidePannel(true);
    } else {
      setHidePannel(false);
    }
  });

  return (
    <>
      <Header />
      <div className={classes.layout}>
        <div className={classes.content} ref={contentRef}>
          {children}
        </div>
        <div
          className={[
            classes.sidePannelContainer,
            hidePannel && classes.Hiden,
          ].join(" ")}
        >
          <SidePannel />
        </div>
      </div>
    </>
  );
};

export default Layout;
