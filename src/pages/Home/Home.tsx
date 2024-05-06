import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import BookComponent from "../../components/UI/BookComponent/BookComponent";
import { dummyBooks } from "../../dummyData";



const HomePage = () => {
  document.title = "Readify | Home";

  return (
    <SidePannelLayout>
      <main>
        <h1>Home Page</h1>
        <BookComponent book={dummyBooks[0]} />
      </main>
    </SidePannelLayout>
  );
};

export default HomePage;
