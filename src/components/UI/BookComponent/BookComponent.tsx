import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import classes from "./BookComponent.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../Types/bookTypes";

interface BookProps {
  book: Book;
}

const BookComponent: React.FC<BookProps> = ({ book }) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleClick = () => navigate(`/books/${book.id}`);

  return (
    <Card
      className={classes.book}
      style={{ boxShadow: "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <CardMedia
        className={classes.cover}
        component="img"
        image={book.cover}
        alt={book.name}
      />
      {isHovering && (
        <Button
          className={classes.addButton}
          style={{
            position: "absolute",
            transition: "opacity 0.3s ease-in-out",
            color: "#b1b8ff",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={classes.plus}
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>{" "}
        </Button>
      )}

      <CardContent className={classes.content} style={{ padding: "0" }}>
        <Typography
          className={classes.title}
          style={{
            fontWeight: "700",
          }}
        >
          {book.name}
        </Typography>
        <Typography className={classes.author}>{book.author.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default BookComponent;
