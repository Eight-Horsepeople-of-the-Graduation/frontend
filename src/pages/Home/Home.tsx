import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
//import BookComponent from "../../components/UI/BookComponent/BookComponent";
import ListPreview from "../../components/UI/ListPreview/ListPreview";
import { dummyBooks, dummyLists } from "../../dummyData";


const HomePage = () => {
  document.title = "Readify | Home";

  return (
    <SidePannelLayout>
      <main>
        <h1>Home Page</h1>
{/*         <BookComponent book={dummyBooks[0]} />
 */}
        <ListPreview list={dummyLists[0]} onListButtonClick={function (): void {
          throw new Error("Function not implemented.");
        } }/>
      </main>
    </SidePannelLayout>
  );
};

export default HomePage;
