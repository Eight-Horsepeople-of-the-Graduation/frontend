import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";

const SingleListPage = () => {
  const { listId } = useParams();

  document.title = "Readify | ListName";
  return (
    <Layout>
      <div>
        <h1>Single List Page</h1>
        <p>List ID: {listId}</p>
      </div>
    </Layout>
  );
};

export default SingleListPage;
