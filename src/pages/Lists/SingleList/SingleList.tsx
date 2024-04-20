import React from "react";
import { useParams } from "react-router-dom";

const SingleListPage = () => {
  const { listId } = useParams();

  document.title = "Readify | ListName";
  return (
    <div>
      <h1>Single List Page</h1>
      <p>List ID: {listId}</p>
    </div>
  );
};

export default SingleListPage;
