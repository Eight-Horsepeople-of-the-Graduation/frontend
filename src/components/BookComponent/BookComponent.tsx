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
import { useAppDispatch } from "../../redux/hooks";
import {
  openAddBookToListModal,
  openRemoveBookFromListModal,
} from "../../redux/features/modals/modalsSlice";

interface BookProps {
  book: Book;
  currentListId?: number;
}

const BookComponent: React.FC<BookProps> = ({ book, currentListId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const BookClick = () => navigate(`/books/${book.id}`);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const addBookToList = () => {
    dispatch(openAddBookToListModal({ bookToAddToListId: book.id }));
    closeMenu();
  };

  const removeBookFromList = () => {
    dispatch(
      openRemoveBookFromListModal({
        bookToRemoveFromListId: book.id,
        listToRemoveBookFromId: currentListId!,
      })
    );
    closeMenu();
  };

  interface MenuOption {
    title: string;
    action: () => void;
    variant?: "default" | "danger";
  }

  const menuOptions: MenuOption[] = [
    {
      title: "Add to lists",
      action: addBookToList,
    },
  ];

  if (currentListId) {
    menuOptions.push({
      title: "Remove from list",
      action: removeBookFromList,
      variant: "danger",
    });
  }

  return (
    <>
      <div className={classes.book} onClick={BookClick} title={book.title}>
        <div className={classes.cover}>
          {book.cover ? (
            <img src={book.cover} alt={book.title} />
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
          {book.authors && <p>{book.authors[0].name}</p>}
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
