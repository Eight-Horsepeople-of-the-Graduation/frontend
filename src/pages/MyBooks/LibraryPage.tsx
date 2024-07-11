import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import BookComponent from "../../components/BookComponent/BookComponent";
import classes from "./Library.module.css";
import { useAppSelector } from "../../redux/hooks";

import { useGetUserBooksQuery } from "../../redux/services/booksApiSlice";

const LibraryPage = () => {
  document.title = `Readify | Library`;

  const userId = useAppSelector((state) => state.authUser.user)?.id ?? 0;
  const { data: userBooks, isSuccess } = useGetUserBooksQuery(userId, {
    skip: !userId,
  });

  if (isSuccess)
    return (
      <SidePannelLayout>
        <div>
          <div className={classes.Header}>
            <h1 className={classes.Title}>Your Library</h1>
            <p>You have {userBooks.length} books in your collection.</p>
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

  return <></>;
};

export default LibraryPage;
