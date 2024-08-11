import SidePanelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import ListPreview from "../../components/ListPreview/ListPreview";
import ImageCarousel from "../../components/ImageCarousel/ImageCarosel";
import { useGetAllListsQuery } from "../../redux/services/listsApiSlice";
import { List } from "../../Types/lists.types";

const HomePage = () => {
  document.title = "Readify | Home";

  const { data: lists } = useGetAllListsQuery();

  return (
    <SidePanelLayout>
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
    </SidePanelLayout>
  );
};

export default HomePage;
