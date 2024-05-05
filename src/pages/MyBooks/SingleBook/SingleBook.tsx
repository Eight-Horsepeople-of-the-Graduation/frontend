import React from "react";
import { useParams } from "react-router-dom";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";

const SingleBookPage = () => {
  const { bookId } = useParams();

  document.title = "Readify | BookName";
  return (
    <SidePannelLayout>
      <div>
        <h1>Single Book Page</h1>
        <p>Book ID: {bookId}</p>
      </div>
    </SidePannelLayout>
  );
};

export default SingleBookPage;
