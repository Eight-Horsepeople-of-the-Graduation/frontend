import classes from "./BookComponent.module.css";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../Types/books.types";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../../redux/hooks";
import { openAddBookToListModal } from "../../../redux/features/modals/modalsSlice";
//import { List } from "../../../Types/lists.types";

interface BookProps {
  book: Book;
}

const BookComponent: React.FC<BookProps> = ({ book }) => {
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

  return (
    <>
      <div className={classes.book} onClick={BookClick}>
        <div className={classes.cover}>
          {book.cover ? (
            <img src={book.cover} alt={book.title} />
          ) : (
            <div className={classes.noCover}>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
          )}
          <button
            aria-label="Add to list"
            title="Add to list"
            className={classes.iconButton}
            id="book-button"
            aria-controls={open ? "book-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className={classes.info}>
          <h2>{book.title}</h2>
          <p>{book.authors[0].name}</p>
        </div>
      </div>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
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
      >
        <MenuItem onClick={addBookToList}>Add to lists</MenuItem>
      </Menu>
    </>
  );
};

export default BookComponent;
