import React from "react";
import { useParams } from "react-router-dom";

const SingleBookPage = () => {
  const { bookId } = useParams();

  document.title = "Readify | BookName";
  return (
    <div>
      <h1>Single Book Page</h1>
      <p>Book ID: {bookId}</p>
    </div>
  );
};

export default SingleBookPage;
