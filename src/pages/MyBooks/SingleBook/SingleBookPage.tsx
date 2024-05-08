import React from "react";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./SingleBookPage.module.css";
import { dummyBooks } from "../../../dummyData";
import { Button } from "@mui/material";
import ChatMessage from "../../../components/Chat/ChatMessage/ChatMessage";
import MessageField from "../../../components/Chat/MessageField/MessageField";
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
    <SidePannelLayout hideSidePannelPoint={(screen.availHeight - 200) / 2}>
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
        <section className={classes.Chat}>
          <h1>Chat with {bookData.title}</h1>
          <main>
            <div>
              <ChatMessage
                message={`No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.

If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.

Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.`}
                fromAi={false}
              />
              <ChatMessage
                message={`No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.

If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.

Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.`}
                fromAi={true}
              />
              <ChatMessage
                message={`No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.

If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.

Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.`}
                fromAi={false}
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
