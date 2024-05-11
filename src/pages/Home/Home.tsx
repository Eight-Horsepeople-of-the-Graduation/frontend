import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import ListPreview from "../../components/ListPreview/ListPreview";
import { dummyLists } from "../../dummyData";
import ImageCarousel from "../../components/ImageCarousel/ImageCarosel";

const HomePage = () => {
  document.title = "Readify | Home";

  return (
    <SidePannelLayout>
      <main style={{ width: "100%", margin: "48px 48px" }}>
        <ImageCarousel url={""}/>
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
