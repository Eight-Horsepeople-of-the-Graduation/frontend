import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import ListPreview from "../../components/ListPreview/ListPreview";
import ImageCarousel from "../../components/ImageCarousel/ImageCarosel";
import { useGetAllListsQuery } from "../../redux/services/listsApiSlice";
import { List } from "../../Types/lists.types";

const HomePage = () => {
  document.title = "Readify | Home";

  const { data: lists } = useGetAllListsQuery();

  return (
    <SidePannelLayout>
      <main
        style={{
          width: "100%",
          margin: "48px 48px 0",
        }}
      >
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
    </SidePannelLayout>
  );
};

export default HomePage;
