import classes from "./BookComponent.module.css";
import { useNavigate } from "react-router-dom";
import { Book } from "../../Types/books.types";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  openAddBookToListModal,
  openRemoveBookFromListModal,
} from "../../redux/features/modals/modalsSlice";
import { Rating } from "@mui/material";
import {
  useAddBookToListMutation,
  useGetListByIdQuery,
  useGetUserListsQuery,
} from "../../redux/services/listsApiSlice";
import { showAlert } from "../../redux/features/alerts/alertsSlice";

interface BookProps {
  book: Book;
  currentListId?: number;
}

const BookComponent: React.FC<BookProps> = ({ book, currentListId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;
  const { data: list } = useGetListByIdQuery(currentListId ?? 0, {
    skip: !currentListId,
  });
  const { data: lists } = useGetUserListsQuery(currentUserId ?? 0, {
    skip: !currentUserId,
  });

  const wantToReadList = lists?.find(
    (list) => list.title.toLowerCase() === "want to read"
  );

  const currentlyReadingList = lists?.find(
    (list) => list.title.toLowerCase() === "currently reading"
  );

  const doneReadingList = lists?.find(
    (list) => list.title.toLowerCase() === "done reading"
  );

  const BookClick = () => navigate(`/books/${book.id}`);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [addBookToList] = useAddBookToListMutation();

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleChooseOption = (action: () => void) => {
    action();
    closeMenu();
  };

  const markAsWantToRead = async () => {
    const listId = wantToReadList?.id;

    if (!listId) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
      return;
    }

    await addBookToList({
      listId,
      bookIds: [book.id],
    });
  };

  const markAsReading = async () => {
    const listId = currentlyReadingList?.id;

    if (!listId) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
      return;
    }

    await addBookToList({
      listId,
      bookIds: [book.id],
    });
  };

  const markAsDoneReading = async () => {
    const listId = doneReadingList?.id;
    if (!listId) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
      return;
    }

    await addBookToList({
      listId,
      bookIds: [book.id],
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const openAddToListsModal = () => {
    dispatch(openAddBookToListModal({ bookToAddToListId: book.id }));
  };

  const removeBookFromList = () => {
    dispatch(
      openRemoveBookFromListModal({
        bookId: book.id,
        listId: currentListId!,
      })
    );
  };

  interface MenuOption {
    title: string;
    action: () => void;
    variant?: "default" | "danger";
  }

  const menuOptions: MenuOption[] = [];

  if (!wantToReadList?.books.find((listBook) => listBook.id === book.id)) {
    menuOptions.push({
      title: "Mark as want to read",
      action: () => handleChooseOption(markAsWantToRead),
    });
  }
  if (
    !currentlyReadingList?.books.find((listBook) => listBook.id === book.id)
  ) {
    menuOptions.push({
      title: "Mark as reading",
      action: () => handleChooseOption(markAsReading),
    });
  }

  if (!doneReadingList?.books.find((listBook) => listBook.id === book.id)) {
    menuOptions.push({
      title: "Mark as done",
      action: () => handleChooseOption(markAsDoneReading),
    });
  }

  menuOptions.push({
    title: "Add to lists",
    action: () => handleChooseOption(openAddToListsModal),
  });

  if (currentListId && list?.userId === currentUserId) {
    menuOptions.push({
      title: "Remove from list",
      action: () => handleChooseOption(removeBookFromList),
      variant: "danger",
    });
  }

  const authorsNames = book.authors
    ? book.authors.map((author) => author.name).join(", ")
    : "";

  return (
    <>
      <div className={classes.book} onClick={BookClick} title={book.title}>
        <div className={classes.cover}>
          {book.coverPicture ? (
            <img src={book.coverPicture} alt={book.title} />
          ) : (
            <div className={classes.noCover}>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
          )}
          <button
            aria-label="Options"
            title="Options"
            className={classes.iconButton}
            id="book-button"
            aria-controls={open ? "book-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        <div className={classes.info}>
          <h2>{book.title}</h2>
          <div>
            <p>{book.rating.toFixed(1)}</p>
            <Rating name="read-only" max={1} value={1} readOnly size="small" />
            {book.authors && <p>{authorsNames}</p>}
          </div>
        </div>
      </div>
      <Menu
        id="book-options-menu"
        aria-labelledby="book-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        autoFocus={false}
      >
        {menuOptions.map((option, idx) => (
          <MenuItem
            key={idx}
            onClick={option.action}
            sx={
              option.variant === "danger"
                ? {
                    color: "var(--dark-error-color)",

                    "&:hover": {
                      backgroundColor: "var(--error-color)",
                    },
                  }
                : {}
            }
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BookComponent;
