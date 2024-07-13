import SidePannelLayout from "../../components/SidePannelLayout/SidePannelLayout";
import classes from "./SingleBookPage.module.css";
import { Button } from "@mui/material";
import BookReader from "../../components/BookReader/BookReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useGetBookByIdQuery,
  useGetBookReviewsQuery,
} from "../../redux/services/booksApiSlice";
import { showAlert } from "../../redux/features/alerts/alertsSlice";
import PageNotFoundPage from "../PageNotFound/PageNotFoundPage";
import {
  openAddBookToListModal,
  startLoading,
  stopLoading,
} from "../../redux/features/modals/modalsSlice";
import ChatSection from "./ChatSection/ChatSection";
import ReviewComponent from "../../components/Review/Review";
import AddReviewComponent from "../../components/Review/AddReview/AddReview";
import { useState } from "react";
import bookFile from "../../assets/black-holes.pdf"

const SingleBookPage = () => {
  document.title = "Readify";

  const { bookId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authUser.user);
  const [reviewToEditId, setReviewToEditId] = useState(0);

  const {
    data: book,
    isSuccess,
    isError,
    isLoading,
  } = useGetBookByIdQuery(Number(bookId), { skip: !bookId });

  const { data: reviews } = useGetBookReviewsQuery(+bookId!, { skip: !bookId });

  if (isError) {
    dispatch(stopLoading());
    dispatch(
      showAlert({
        message: "Book not found",
        severity: "error",
      })
    );

    return <PageNotFoundPage />;
  }

  if (isLoading) dispatch(startLoading());

  if (isSuccess) {
    document.title = `Readify | ${book.title}`;
    dispatch(stopLoading());

    const reviewersIds = reviews?.map((review) => review.userId);
    const userReviewed = reviewersIds?.includes(user?.id ?? 0);

    const authorsNames = book.authors.map((author) => author.name).join(", ");

    const generes = book.genres?.map((genere) => genere.title).join(", ");

    return (
      <SidePannelLayout hideSidePannelPoint={(screen.availHeight - 200) / 2}>
        <main style={{ width: "100%" }}>
          <section id="info" className={classes.Info}>
            <div className={classes.Content}>
              {book.coverPicture ? (
                <img src={book.coverPicture} title={book.title} />
              ) : (
                <div className={classes.NoCover} title={book.title}>
                  <FontAwesomeIcon icon={faBookOpen} />
                </div>
              )}
              <div>
                <div className={classes.Title}>
                  <h1>{book.title}</h1>
                  <Button
                    onClick={() =>
                      dispatch(
                        openAddBookToListModal({
                          bookToAddToListId: book.id,
                        })
                      )
                    }
                    variant="contained"
                    title="Add to list"
                  >
                    +
                  </Button>
                </div>
                <div className={classes.Data}>
                  <div>
                    <h3>Authors</h3>
                    <p>{authorsNames}</p>
                  </div>
                  <div>
                    <h3>Genres</h3>
                    <p>{generes}</p>
                  </div>
                  <div>
                    <h3>Pages</h3>
                    <p>{book.numOfPages}</p>
                  </div>
                  <div>
                    <h3>Rating</h3>
                    <p>{book.rating.toFixed(1)}</p>
                  </div>
                </div>
                <div className={classes.Desc}>
                  <h3>Overview</h3>
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
          </section>

          {book.pdfLink && book.id === 1 && (
            <section id="reader" className={classes.Reader}>
              <h1>Read {book.title}</h1>
              <main>
                <BookReader file={bookFile} language={book.language} />
              </main>
            </section>
          )}

          {user && <ChatSection user={user} book={book} />}

          <section className={classes.ReviewSection}>
            {user && !userReviewed && <AddReviewComponent bookId={book.id} />}
            {reviews &&
              [...reviews]
                .reverse()
                .map((review) =>
                  reviewToEditId === review.id ? (
                    <AddReviewComponent
                      bookId={book.id}
                      reviewToEdit={review}
                      doneEditing={() => setReviewToEditId(0)}
                      key={review.id}
                    />
                  ) : (
                    <ReviewComponent
                      review={review}
                      key={review.id}
                      editReview={setReviewToEditId}
                    />
                  )
                )}
          </section>
        </main>
      </SidePannelLayout>
    );
  }
};

export default SingleBookPage;
