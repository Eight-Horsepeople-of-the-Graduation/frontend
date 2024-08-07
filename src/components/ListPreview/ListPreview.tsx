import * as React from "react";
import { useNavigate } from "react-router-dom";
import BookComponent from "../BookComponent/BookComponent";
import { List as list } from "../../Types/lists.types";
import { Book } from "../../Types/books.types";
import classes from "./ListPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PrivacySwitch from "../PrivacySwitch/PrivacySwitch";
import { useAppSelector } from "../../redux/hooks";
import capitalizeWords from "../../helperFuctions/capitalizeWords";
interface ListPreviewProps {
  list: list;
}

const ListPreview: React.FC<ListPreviewProps> = ({ list }) => {
  const navigate = useNavigate();
  const onListButtonClick = () => navigate(`/lists/${list.id}`);
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;

  return (
    <div className={classes.List}>
      <header>
        <h1>{capitalizeWords(list.title)}</h1>
        {list.userId === currentUserId && <PrivacySwitch list={list} />}{" "}
      </header>
      <div className={classes.Books}>
        {list.books.slice(0, 5).map((book: Book, index: number) => (
          <BookComponent key={index} book={book} currentListId={list.id} />
        ))}
        <div className={classes.ButtonContainer}>
          <button onClick={onListButtonClick}>
            <span>See all</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPreview;
