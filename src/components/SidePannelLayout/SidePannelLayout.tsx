import React from "react";
import SidePannel from "../SidePannel/SidePannel";
import classes from "./SidePannelLayout.module.css";
import Header from "../Header/Header";

interface SidePannelLayoutProps {
  children: React.ReactNode;
  hideSidePannelPoint?: number;
}

const SidePannelLayout = ({
  children,
  hideSidePannelPoint,
}: SidePannelLayoutProps) => {
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const [hideSidePannel, setHideSidePannel] = React.useState<boolean>(false);

  window.addEventListener("scroll", () => {
    if (!hideSidePannelPoint) return;

    if (window.scrollY > hideSidePannelPoint) {
      setHideSidePannel(true);
    } else {
      setHideSidePannel(false);
    }
  });

  return (
    <>
      <Header />
      <div
        className={[classes.layout, hideSidePannel && classes.full].join(" ")}
        ref={layoutRef}
      >
        {children}
        <SidePannel isHiden={hideSidePannel} />
      </div>
    </>
  );
};

export default SidePannelLayout;
