import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";

const HomePage = () => {
  document.title = "Readify | Home";

  return (
    <SidePannelLayout>
      <main>
        <h1>Home Page</h1>
      </main>
    </SidePannelLayout>
  );
};

export default HomePage;
