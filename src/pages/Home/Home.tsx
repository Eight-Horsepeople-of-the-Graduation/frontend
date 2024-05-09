import React from "react";
import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
//import BookComponent from "../../components/UI/BookComponent/BookComponent";
import ListPreview from "../../components/UI/ListPreview/ListPreview";
import { dummyLists } from "../../dummyData";

const HomePage = () => {
  document.title = "Readify | Home";

  return (
    <SidePannelLayout>
      <main style={{ width: "100%", margin: "48px 48px" }}>
        {dummyLists
          .filter((list) => list.books.length)
          .map((list) => (
            <ListPreview
              key={list.id}
              list={list}
              onListButtonClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
      </main>
    </SidePannelLayout>
  );
};

export default HomePage;
