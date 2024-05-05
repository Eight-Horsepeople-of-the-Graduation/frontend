import React from "react";
import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";

const LibraryPage = () => {
  document.title = `Readify | Library`;
  return (
    <SidePannelLayout>
      <div>
        <h1>Library Page</h1>
      </div>
    </SidePannelLayout>
  );
};

export default LibraryPage;
