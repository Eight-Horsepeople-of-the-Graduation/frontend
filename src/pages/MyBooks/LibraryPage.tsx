import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import BookComponent from "../../components/BookComponent/BookComponent";
import classes from "./Library.module.css";
import { dummyBooks } from "../../dummyData";
import { Book } from "../../Types/books.types";

function countBooks(books: Book[]) {
  return books.length;
}

const NumOfBooks = countBooks(dummyBooks);

const LibraryPage = () => {
  document.title = `Readify | Library`;
  return (
    <SidePannelLayout>
      <div>
        <div className={classes.Header}>
          <h1 className={classes.Title}>Your Library</h1>
          <p>You have {NumOfBooks} books in your collection.</p>
        </div>
        <div className={classes.List}>
          {dummyBooks.map((book) => (
            <div key={book.id}>
              <BookComponent key={book.id} book={book} />
            </div>
          ))}
        </div>
      </div>
    </SidePannelLayout>
  );
};

export default LibraryPage;
