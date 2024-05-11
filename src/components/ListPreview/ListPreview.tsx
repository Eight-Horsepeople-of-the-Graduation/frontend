import * as React from "react";
import { useNavigate } from "react-router-dom";
import BookComponent from "../BookComponent/BookComponent";
import { List as list } from "../../Types/lists.types";
import { Book } from "../../Types/books.types";
import classes from "./ListPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PrivacySwitch from "../PrivacySwitch/PrivacySwitch";
import { useEditListMutation } from "../../redux/services/listsApiSlice";

interface ListPreviewProps {
  list: list;
}

const ListPreview: React.FC<ListPreviewProps> = ({ list }) => {
  const navigate = useNavigate();
  const onListButtonClick = () => navigate(`/lists/${list.id}`);
  const [isPrivate, setIsPrivate] = React.useState<boolean>(
    list.privacy === "PRIVATE"
  );

  const [editList, { isSuccess }] = useEditListMutation();

  const handlePrivacyChange = async () => {
    await editList({
      id: list.id,
      listData: { ...list, privacy: isPrivate ? "PUBLIC" : "PRIVATE" },
    });

    if (isSuccess) {
      setIsPrivate(!isPrivate);
    }
  };

  return (
    <div className={classes.List}>
      <header>
        <h1>{list.title}</h1>
        <PrivacySwitch isChecked={isPrivate} onChange={handlePrivacyChange} />
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

