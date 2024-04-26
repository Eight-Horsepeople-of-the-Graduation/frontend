import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";

const SingleBookPage = () => {
  const { bookId } = useParams();

  document.title = "Readify | BookName";
  return (
    <Layout>
      <div>
        <h1>Single Book Page</h1>
        <p>Book ID: {bookId}</p>
      </div>
    </Layout>
  );
};

export default SingleBookPage;
