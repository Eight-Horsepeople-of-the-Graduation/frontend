import React from "react";
import Layout from "../../components/Layout/Layout";

const MyBooksPage = () => {
  document.title = `Readify | My Books`;
  return (
    <Layout>
      <div>
        <h1>My Books Page</h1>
      </div>
    </Layout>
  );
};

export default MyBooksPage;
