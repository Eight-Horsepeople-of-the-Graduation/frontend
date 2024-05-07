import React from "react";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./SingleBookPage.module.css";
import { dummyBooks } from "../../../dummyData";
import { Button } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useAppDispatch } from "../../../redux/hooks";
// import { useGetBookByIdQuery } from "../../../redux/services/booksApiSlice";
// import { showAlert } from "../../../redux/features/alerts/alertsSlice";
// import PageNotFoundPage from "../../PageNotFound/PageNotFoundPage";

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

  document.title = "Readify | BookName";
  return (
    <SidePannelLayout hideSidePannelPoint={screen.availHeight - 150}>
      <main style={{ width: "100%" }}>
        <section className={classes.Info}>
          <div className={classes.Content}>
            <img src={bookData.cover} />
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
        <section
          style={{ height: "100vh", width: "100%", backgroundColor: "green" }}
        >
          2
        </section>
        <section style={{ height: "100vh", width: "100%" }}>3</section>
      </main>
    </SidePannelLayout>
  );
};

export default SingleBookPage;
