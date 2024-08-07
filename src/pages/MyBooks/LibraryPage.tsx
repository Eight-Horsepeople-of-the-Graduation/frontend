import SidePanelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import BookComponent from "../../components/BookComponent/BookComponent";
import classes from "./Library.module.css";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserBooksQuery } from "../../redux/services/booksApiSlice";
import signupVector from "../../../src/assets/images/singupVector.png";

const LibraryPage = () => {
  document.title = `Readify | Library`;

  const userId = useAppSelector((state) => state.authUser.user)?.id ?? 0;
  const { data: userBooks, isSuccess } = useGetUserBooksQuery(userId, {
    skip: !userId,
  });

  return (
    <SidePanelLayout>
      <main style={{ width: "100%" }}>
        {!userId ? (
          <div className={classes.NotAuthMessage}>
            <img
              src={signupVector}
              className={classes.image}
              alt="Signup Vector"
            />
            <p>Please log in or register to view your Library.</p>
          </div>
        ) : (
          isSuccess && (
            <>
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
            </>
          )
        )}
      </main>
    </SidePanelLayout>
  );
};

export default LibraryPage;
