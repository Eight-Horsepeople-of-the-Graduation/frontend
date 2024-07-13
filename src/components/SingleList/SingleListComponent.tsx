import { List } from "../../Types/lists.types";
import { useAppDispatch } from "../../redux/hooks";
import {
  openDeleteListModal,
  startLoading,
  stopLoading,
} from "../../redux/features/modals/modalsSlice";
import { showAlert } from "../../redux/features/alerts/alertsSlice";
import { useEditListMutation } from "../../redux/services/listsApiSlice";
import PageNotFoundPage from "../../pages/PageNotFound/PageNotFoundPage";
import BookComponent from "../BookComponent/BookComponent";
import classes from "./SingleListComponent.module.css";
import EditIcon from "@mui/icons-material/Edit";
import PrivacySwitch from "../PrivacySwitch/PrivacySwitch";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import BinIcon from "@mui/icons-material/DeleteOutlineOutlined";
import convertFirstLetterToUppercase from "../../helperFuctions/convertFirstLetterToUppercase";

interface ListProps {
  list: List;
  isFetchingList: boolean;
  errorFetchingList: boolean;
  listFetched: boolean;
  isEditable?: {
    canEditName: boolean;
    canEditPrivacy: boolean;
    canDelete: boolean;
  };
}

const SingleListComponent: React.FC<ListProps> = ({
  list,
  isFetchingList,
  errorFetchingList,
  listFetched,
  isEditable,
}) => {
  const dispatch = useAppDispatch();
  const [isEditingName, setISEditngName] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [editList, { isSuccess, isError }] = useEditListMutation();

  const startEditName = () => {
    setISEditngName(true);
  };
  const finishEditName = async () => {
    setISEditngName(false);
    if (!list) return;

    const title = titleRef.current?.innerText;

    if (!title) {
      titleRef.current!.innerText = list?.title ?? "Untitled";
      return;
    }

    if (title === list.title) return;
    dispatch(startLoading());

    await editList({
      id: list.id,
      listData: { description: list.description, privacy: list.privacy, title },
    });

    if (isError) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
      titleRef.current.innerText = list.title;
    }

    if (isSuccess || !isError) {
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

  if (listFetched && list) {
    dispatch(stopLoading());

    document.title = `Readify | ${convertFirstLetterToUppercase(list.title)}`;

    return (
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
            {convertFirstLetterToUppercase(list.title)}
          </h1>
          {isEditable && (
            <div className={classes.Controllers}>
              <div>
                {isEditable.canEditName && (
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
                )}
                {isEditable.canEditPrivacy && <PrivacySwitch list={list} />}
              </div>
              {isEditable.canDelete && (
                <Button
                  title={"Delete list"}
                  area-label="delete"
                  sx={{
                    fontSize: "24px",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    minWidth: "36px",
                  }}
                  color="error"
                  onClick={() => dispatch(openDeleteListModal(list.id))}
                >
                  <BinIcon />
                </Button>
              )}
            </div>
          )}
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
    );
  }
};

export default SingleListComponent;
