// import React from "react";
import Layout from "../../components/Layout/Layout";
import BookComponent from "../../components/UI/BookComponent/BookComponent";
import { Box } from "@mui/material";
import { dummyBooks } from "../../components/UI/BookComponent/dummyBooks";
const HomePage = () => {
  document.title = "Readify | Home";

  return (
    <Layout>
      <Box>
        <BookComponent book={dummyBooks[0]} />
      </Box>
    </Layout>
  );
};

export default HomePage;
