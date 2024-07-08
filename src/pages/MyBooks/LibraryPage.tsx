import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import BookComponent from "../../components/BookComponent/BookComponent";
import classes from "./Library.module.css";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserListsQuery } from "../../redux/services/listsApiSlice";
import { Book } from "../../Types/books.types";

const LibraryPage = () => {
  document.title = `Readify | Library`;

  const userId = useAppSelector(state => state.authUser.user)?.id ?? 0;
  const { data: userLists } = useGetUserListsQuery(userId, { skip: !userId });



  const userBooks = new Set([] as Book[]);

  userLists?.forEach((list) =>
    list.books.forEach((book) =>
      userBooks.add(book))
  )


  return (
    <SidePannelLayout>
      <div>
        <div className={classes.Header}>
          <h1 className={classes.Title}>Your Library</h1>
          <p>You have {userBooks.size} books in your collection.</p>
        </div>
        <div className={classes.List}>
          {[...userBooks].map((book) => (
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
