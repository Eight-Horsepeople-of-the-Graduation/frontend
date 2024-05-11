import { useParams } from "react-router-dom";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import { dummyLists } from "../../../dummyData";
import BookComponent from "../../../components/BookComponent/BookComponent";
import PageNotFoundPage from "../../PageNotFound/PageNotFoundPage";
import classes from "./SingleList.module.css";
import EditIcon from "@mui/icons-material/Edit";
import PrivacySwitch from "../../../components/PrivacySwitch/PrivacySwitch";
import { Button } from "@mui/material";

const SingleListPage = () => {
  const { listId } = useParams();

  const matchingList = dummyLists.find((list) => Number(listId) === list.id);

  if (!matchingList) return <PageNotFoundPage />;

  document.title = "Readify | ListName";
  return (
    <SidePannelLayout>
      <div>
        <div className={classes.ListHeader}>
          <h1 className={classes.ListTitle}>{matchingList.title}</h1>
          <div className={classes.Controllers}>
            <Button
              aria-label="edit"
              sx={{
                fontSize: "24px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                minWidth: "36px",
              }}
              color="primary"
            >
              <EditIcon />
            </Button>
            <PrivacySwitch
              isChecked={false}
              onChange={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
        <div className={classes.List}>
          {matchingList?.books.map((book) => (
            <div key={book.id}>
              <BookComponent key={book.id} book={book} />
            </div>
          ))}
        </div>
      </div>
    </SidePannelLayout>
  );
};

export default SingleListPage;
