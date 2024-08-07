import React from "react";
import SidePanel from "../SidePannel/SidePanel";
import classes from "./SidePanelLayout.module.css";
import Header from "../Header/Header";

interface SidePanelLayoutProps {
  children: React.ReactNode;
  hideSidePanelPoint?: number;
}

const SidePanelLayout = ({
  children,
  hideSidePanelPoint: hideSidePanelPoint,
}: SidePanelLayoutProps) => {
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const [hideSidePanel, setHideSidePanel] = React.useState<boolean>(false);

  window.addEventListener("scroll", () => {
    if (!hideSidePanelPoint) return;

    if (window.scrollY > hideSidePanelPoint) {
      setHideSidePanel(true);
    } else {
      setHideSidePanel(false);
    }
  });

  return (
    <>
      <Header />
      <div
        className={[classes.layout, hideSidePanel && classes.full].join(" ")}
        ref={layoutRef}
      >
        {children}
        <SidePanel isHidden={hideSidePanel} />
      </div>
    </>
  );
};

export default SidePanelLayout;
