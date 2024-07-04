import { useParams } from "react-router-dom";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import BookComponent from "../../../components/BookComponent/BookComponent";
import PageNotFoundPage from "../../PageNotFound/PageNotFoundPage";
import classes from "./SingleListPage.module.css";
import EditIcon from "@mui/icons-material/Edit";
import PrivacySwitch from "../../../components/PrivacySwitch/PrivacySwitch";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import {
  useEditListMutation,
  useGetListByIdQuery,
} from "../../../redux/services/listsApiSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  startLoading,
  stopLoading,
} from "../../../redux/features/modals/modalsSlice";

const SingleListPage = () => {
  const { listId } = useParams();
  const dispatch = useAppDispatch();
  const [isEditingName, setISEditngName] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [editList, { isSuccess, isError }] = useEditListMutation();
  const currentUserId = useAppSelector(state => state.authUser.user)?.id ?? 0;

  const {
    data: list,
    isSuccess: listFetched,
    isLoading: isFetchingList,
    isError: errorFetchingList,
  } = useGetListByIdQuery(+listId!, { skip: !listId });

  const startEditName = () => {
    setISEditngName(true);
  };
  const finishEditName = async () => {
    dispatch(startLoading());
    setISEditngName(false);
    if (!list) return;
    const title = titleRef.current?.innerText;

    if (!title) {
      titleRef.current!.innerText = list?.title ?? "Untitled";
      return;
    }

    if (title === list.title) return;

    await editList({ id: list.id, listData: { description: list.description, privacy: list.privacy, title } });

    if (isError) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
      titleRef.current.innerText = list.title;
    }

    if (isSuccess) {
      dispatch(
        showAlert({
          message: "List name updated successfully",
          severity: "success",
        })
      );
    }

    dispatch(stopLoading());
  };

  titleRef.current?.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await finishEditName();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      titleRef.current!.innerText = list?.title ?? "Untitled";
      setISEditngName(false);
    }
  });

  if (isFetchingList) dispatch(startLoading());

  if (errorFetchingList) {
    dispatch(stopLoading());
    dispatch(showAlert({ message: "List not found", severity: "error" }));
    return <PageNotFoundPage />;
  }

  if (listFetched) {
    dispatch(stopLoading());

    document.title = `Readify | ${list.title}`;
    return (
      <SidePannelLayout>
        <main className={classes.SingleListPage}>
          <div className={classes.ListHeader}>
            <h1
              className={classes.ListTitle}
              contentEditable={isEditingName}
              ref={titleRef}
              style={{
                cursor: isEditingName ? "text" : "default",
                outline: "none",
                border: isEditingName ? "var(--border)" : "none",
              }}
            >
              {list.title}
            </h1>
            {list.userId === currentUserId && <div className={classes.Controllers}>
              <Button
                title={isEditingName ? "Save" : "Edit list name"}
                aria-label="edit"
                sx={{
                  fontSize: "24px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  minWidth: "36px",
                }}
                color="primary"
                onClick={isEditingName ? finishEditName : startEditName}
              >
                {isEditingName ? <CheckIcon /> : <EditIcon />}
              </Button>
              <PrivacySwitch
                list={list}
              />
            </div>}
          </div>

          <div className={classes.List}>
            {list?.books.map((book) => (
              <div key={book.id}>
                <BookComponent
                  key={book.id}
                  book={book}
                  currentListId={list.id}
                />
              </div>
            ))}
          </div>
        </main>
      </SidePannelLayout>
    );
  }
};

export default SingleListPage;
