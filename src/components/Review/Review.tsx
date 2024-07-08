import { useState } from "react";
import { User } from "../../Types/users.types";
//import { useAppSelector } from "../../redux/hooks";
import CustomAvatar from "../UI/CustomAvatar/CustomAvatar";
import classes from "./Review.module.css";
import { Button, Rating } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//import CheckIcon from "@mui/icons-material/Check";
//import { useAppDispatch } from "../../../redux/hooks";
//import { showAlert } from "../../../redux/features/alerts/alertsSlice";

interface ReviewProps {
  user: User;
  rating: number;
  date: string;
  text: string;
  showMore?: boolean; // Optional prop for controlling text visibility
}
const Review: React.FC<ReviewProps> = ({
  user,
  rating,
  date,
  text,
  showMore = false,
}) => {

  const [isExpanded, setIsExpanded] = useState(showMore);
  const toggleTextVisibility = () => setIsExpanded(!isExpanded);
  const reviewText = isExpanded ? text : text.slice(0, 250) + "..."; 

  //const [isEditingReview, setISEditngReview] = useState(false);
  //const [editReview, { isSuccess, isError }] = useEditListMutation();

  if (!user) return <></>;

  return (
    <div className={classes.review}>
      <div>
        <CustomAvatar user={user} size="m" />
      </div>
      <div className={classes.reviewContent}>
        <div className={classes.reviewHeader}>
          <div className={classes.info}>
            <span className={classes.reviewName}>{user.name}</span>
            <div className={classes.reviewRating}>
              <Rating
                name="read-only"
                value={rating}
                readOnly
                precision={0.5}
              />
            </div>
          </div>
          <span className={classes.reviewDate}>{date}</span>
        </div>
        <div className={classes.reviewText}>{reviewText}</div>
        <div className={classes.buttons}>
          {text.length > 100 && (
            <Button
              variant="text"
              size="small"
              sx={{ fontSize: "0.8rem", padding: "4px 12px" }}
              onClick={toggleTextVisibility}
            >
              {" "}
              {isExpanded ? "Show Less" : "Show More"}
            </Button>
          )}

          <div className={classes.iconButtons}>
            <IconButton aria-label="delete" size="small" color="primary">
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              // title={isEditingReview ? "Save" : "Edit list name"}
              aria-label="edit"
              size="small"
              color="primary"
              //onClick={isEditingName ? finishEditName : startEditName}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
