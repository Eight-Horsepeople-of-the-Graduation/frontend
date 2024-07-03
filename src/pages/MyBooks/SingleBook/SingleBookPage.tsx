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
  const { bookId } = useParams();
  const dispatch = useAppDispatch();

  const { data: bookData, isError, isLoading } = useGetBookByIdQuery(+bookId!);

  if (isLoading) dispatch(startLoading());

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

  document.title = `Readify | ${bookData!.title}`;
  return (
    <SidePannelLayout hideSidePannelPoint={(screen.availHeight - 200) / 2}>
      <main style={{ width: "100%" }}>
        <section id="info" className={classes.Info}>
          <div className={classes.Content}>
            {bookData!.cover ? (
              <img src={bookData!.cover} title={bookData!.title} />
            ) : (
              <div className={classes.NoCover} title={bookData!.title}>
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
            )}
            <div>
              <div className={classes.Title}>
                <h1>{bookData!.title}</h1>
                <Button variant="contained" title="Add to list">
                  +
                </Button>
              </div>
              <div className={classes.Data}>
                <div>
                  <h3>Pages</h3>
                  <p>{bookData!.numOfPages}</p>
                </div>
                <div>
                  <h3>Author</h3>
                  <p>{bookData!.authors[0].name}</p>
                </div>
                <div>
                  <h3>Genre</h3>
                  <p>Test</p>
                </div>
              </div>
              <div className={classes.Desc}>
                <h3>Overview</h3>
                <p>{bookData!.description}</p>
              </div>
            </div>
          </div>
        </section>

        {bookData!.pdfLink && (
          <section id="reader" className={classes.Reader}>
            <h1>Read {bookData!.title}</h1>
            <main>
              <BookReader
                file={bookData!.pdfLink}
                language={bookData!.language}
              />
            </main>
          </section>
        )}

        <section id="chat" className={classes.Chat}>
          <h1>Chat with {bookData!.title}</h1>
          <main>
            <div>
              <ChatMessage
                message={"Hello, I'm Ai, I'm here to help you with this book."}
                fromAi={true}
              />
            </div>
            <MessageField />
          </main>
        </section>
      </main>
    </SidePannelLayout>
  );
};

export default SingleBookPage;
