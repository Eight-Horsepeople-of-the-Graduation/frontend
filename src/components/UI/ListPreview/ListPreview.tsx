import * as React from "react";
import {
  List,
  ListItem,
  TextField,
  ListItemIcon,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookComponent from "../BookComponent/BookComponent";
import { List as list } from "../../../Types/lists.types";
import { Book } from "../../../Types/books.types";
import classes from "./ListPreview.module.css";
import PrivacySwitch from "../privacySwitch/privacySwitch";

interface ListPreviewProps {
  list: list;
  onListButtonClick: () => void; // Function to handle list button click
}

const ListPreview: React.FC<ListPreviewProps> = ({ list }) => {
  const navigate = useNavigate();
  const onListButtonClick = () => navigate(`/lists/${list.id}`);


  return (
    <List className={classes.list}>
      <ListItem className={classes.listDetials}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue={list.title}
          variant="filled"
          size="small"
        />
        <PrivacySwitch />

        {/*    <ListItemIcon>
          {list.privacy === "PUBLIC" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H392.6c-5.4-9.4-8.6-20.3-8.6-32V352c0-2.1 .1-4.2 .3-6.3c-31-26-71-41.7-114.6-41.7H178.3zM528 240c17.7 0 32 14.3 32 32v48H496V272c0-17.7 14.3-32 32-32zm-80 32v48c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32V272c0-44.2-35.8-80-80-80s-80 35.8-80 80z" />
            </svg>
          )}
        </ListItemIcon> */}
      </ListItem>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        className={classes.bookList}
      >
        {list.books
          .slice(0, 5)
          .map((book: Book, index: React.Key | null | undefined) => (
            <ListItem key={index} className={classes.bookInList}>
              <BookComponent book={book} />
            </ListItem>
          ))}
        <ListItem className={classes.seeAllButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={onListButtonClick}
          >
            See All Books
          </Button>
        </ListItem>
      </Stack>
    </List>
  );
};

export default ListPreview;
