import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./SingleBookPage.module.css";
import { dummyBooks } from "../../../dummyData";
import { Button } from "@mui/material";
import ChatMessage from "../../../components/Chat/ChatMessage/ChatMessage";
import MessageField from "../../../components/Chat/MessageField/MessageField";
import PDFViewer from "../../../components/PDFViewer/PDFViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const SingleBookPage = () => {
  // const { bookId } = useParams();
  // const dispatch = useAppDispatch();

  // const {
  //   data: book,
  //   isSuccess,
  //   isError,
  //   isLoading,
  // } = useGetBookByIdQuery(+bookId!);

  // if (isLoading) return <>Loading</>;

  // if (isError) {
  //   dispatch(
  //     showAlert({
  //       message: "Book not found",
  //       severity: "error",
  //     })
  //   );

  //   return <PageNotFoundPage />;
  // }

  // All the comming code is pased on dummy data

  const bookData = dummyBooks[0];

  document.title = `Readify | ${bookData.title}`;
  return (
    <SidePannelLayout hideSidePannelPoint={(screen.availHeight - 200) / 2}>
      <main style={{ width: "100%", scrollSnapType: "y mandatory" }}>
        <section id="info" className={classes.Info}>
          <div className={classes.Content}>
            {bookData.cover ? (
              <img src={bookData.cover} title={bookData.title} />
            ) : (
              <div className={classes.NoCover} title={bookData.title}>
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
            )}
            <div>
              <div className={classes.Title}>
                <h1>{bookData.title}</h1>
                <Button variant="contained" title="Add to list">
                  +
                </Button>
              </div>
              <div className={classes.Data}>
                <div>
                  <h3>Pages</h3>
                  <p>{bookData.numOfPages}</p>
                </div>
                <div>
                  <h3>Author</h3>
                  <p>{bookData.authors[0].name}</p>
                </div>
                <div>
                  <h3>Genre</h3>
                  <p>{bookData.genres[0].title}</p>
                </div>
              </div>
              <div className={classes.Desc}>
                <h3>Overview</h3>
                <p>{bookData.description}</p>
              </div>
            </div>
          </div>
        </section>

        {bookData.file && (
          <section id="reader" className={classes.Reader}>
            <h1>Read {bookData.title}</h1>
            <main>
              <PDFViewer file={bookData.file} />
            </main>
          </section>
        )}

        <section id="chat" className={classes.Chat}>
          <h1>Chat with {bookData.title}</h1>
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
