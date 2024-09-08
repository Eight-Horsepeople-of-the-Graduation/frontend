import SidePanelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import ListPreview from "../../components/ListPreview/ListPreview";
import ImageCarousel from "../../components/ImageCarousel/ImageCarosel";
import { useGetAllListsQuery } from "../../redux/services/listsApiSlice";
import { List } from "../../Types/lists.types";
import classes from "./Home.module.css";

const HomePage = () => {
  document.title = "Readify | Home";

  const { data: lists } = useGetAllListsQuery();

  return (
    <SidePanelLayout>
      <main className={classes.Home}>
        <section
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImageCarousel />
        </section>
        
        {(lists ?? ([] as List[]))
          .filter((list) => list.books.length)
          .map((list, idx) => (
            <ListPreview key={idx} list={list} />
          ))}
      </main>
    </SidePanelLayout>
  );
};

export default HomePage;
