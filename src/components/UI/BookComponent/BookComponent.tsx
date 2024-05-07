import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import classes from "./BookComponent.module.css";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../Types/books.types";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
//import { List } from "../../../Types/lists.types";

interface BookProps {
  book: Book;
}

const BookComponent: React.FC<BookProps> = ({ book }) => {
  const navigate = useNavigate();
  const BookClick = () => navigate(`/books/${book.id}`);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        className={classes.book}
        style={{ boxShadow: "none" }}
        onClick={BookClick}
      >
        <Box className={classes.container}>
          <CardMedia
            className={classes.cover}
            component="img"
            image={book.cover}
            alt={book.title}
          />
          <Button
            className={classes.readButton}
            style={{
              transition: "opacity 0.3s ease-in-out",
              color: "var(--gray-color)",
            }}
          >
            Read Now
          </Button>
        </Box>
        <CardContent className={classes.content} style={{ padding: "0" }}>
          <Typography
            className={classes.title}
            style={{
              fontWeight: "700",
            }}
          >
            {book.title}
          </Typography>
          <Typography className={classes.author}>
            {book.authors[0].name}
          </Typography>
        </CardContent>
      </Card>
      <div>
        <IconButton
          aria-label="Add to list"
          className={classes.iconButton}
          id="book-button"
          aria-controls={open ? "book-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={classes.icon}
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </IconButton>
        <Menu
          id="positioned-menu"
          aria-labelledby="positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>List 1</MenuItem>
          <MenuItem onClick={handleClose}>List 2</MenuItem>
          <MenuItem onClick={handleClose}>List 3</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default BookComponent;
