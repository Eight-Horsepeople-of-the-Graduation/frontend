import React from "react";
import SidePannelLayout from "../../../../../components/SidePannelLayout/SidePannelLayout";

const CurrentlyReadingPage = () => {
  document.title = "Readify | Currently Reading";

  return (
    <SidePannelLayout>
      <div>
        <h1>Currently Reading Page</h1>
      </div>
    </SidePannelLayout>
  );
};

export default CurrentlyReadingPage;
