import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./SingleBookPage.module.css";
import { Button } from "@mui/material";
import ChatMessage from "../../../components/Chat/ChatMessage/ChatMessage";
import MessageField from "../../../components/Chat/MessageField/MessageField";
import BookReader from "../../../components/BookReader/BookReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { useGetBookByIdQuery } from "../../../redux/services/booksApiSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import PageNotFoundPage from "../../PageNotFound/PageNotFoundPage";
import {
  startLoading,
  stopLoading,
} from "../../../redux/features/modals/modalsSlice";

const SingleBookPage = () => {
  document.title = "Readify";

  const { bookId } = useParams();
  const dispatch = useAppDispatch();

  const {
    data: book,
    isSuccess,
    isError,
    isLoading,
  } = useGetBookByIdQuery(Number(bookId), { skip: !bookId });

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
    return (
      <SidePannelLayout hideSidePannelPoint={(screen.availHeight - 200) / 2}>
        <main style={{ width: "100%" }}>
          <section id="info" className={classes.Info}>
            <div className={classes.Content}>
              {book.cover ? (
                <img src={book.cover} title={book.title} />
              ) : (
                <div className={classes.NoCover} title={book.title}>
                  <FontAwesomeIcon icon={faBookOpen} />
                </div>
              )}
              <div>
                <div className={classes.Title}>
                  <h1>{book.title}</h1>
                  <Button variant="contained" title="Add to list">
                    +
                  </Button>
                </div>
                <div className={classes.Data}>
                  <div>
                    <h3>Pages</h3>
                    <p>{book.numOfPages}</p>
                  </div>
                  <div>
                    <h3>Author</h3>
                    <p>{book.authors[0].name}</p>
                  </div>
                  <div>
                    <h3>Genre</h3>
                    <p>Test</p>
                  </div>
                </div>
                <div className={classes.Desc}>
                  <h3>Overview</h3>
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
          </section>

          {book.pdfLink && book.pdfLink.endsWith(".pdf") && (
            <section id="reader" className={classes.Reader}>
              <h1>Read {book.title}</h1>
              <main>
                <BookReader file={book.pdfLink} language={book.language} />
              </main>
            </section>
          )}

          <section id="chat" className={classes.Chat}>
            <h1>Chat with {book.title}</h1>
            <main>
              <div>
                <ChatMessage
                  message={
                    "Hello, I'm Ai, I'm here to help you with this book."
                  }
                  fromAi={true}
                />
              </div>
              <MessageField />
            </main>
          </section>
        </main>
      </SidePannelLayout>
    );
  }
};

export default SingleBookPage;
