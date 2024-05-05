import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import classes from "./BookComponent.module.css";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../Types/books.types";

interface BookProps {
  book: Book;
}

const BookComponent: React.FC<BookProps> = ({ book }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/books/${book.id}`);

  return (
    <Card
      className={classes.book}
      style={{ boxShadow: "none" }}
      onClick={handleClick}
    >
      <CardMedia
        className={classes.cover}
        component="img"
        image={book.cover}
        alt={book.title}
      />
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

      <CardContent className={classes.content} style={{ padding: "0" }}>
        <Typography
          className={classes.title}
          style={{
            fontWeight: "700",
          }}
        >
          {book.title}
        </Typography>
        <Typography className={classes.author}>{book.authors[0].name}</Typography>
      </CardContent>
    </Card>
  );
};

export default BookComponent;
