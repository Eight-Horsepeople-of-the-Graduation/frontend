import { SetStateAction, useState } from "react";
import { User } from "../../Types/users.types";
//import { useAppSelector } from "../../redux/hooks";
import CustomAvatar from "../UI/CustomAvatar/CustomAvatar";
import classes from "./Review.module.css";
import { Button, Rating } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Review } from "../../Types/books.types";
import { formatISODateToDDMMYYYY } from "../../helperFuctions/formatISODateToDDMMYYYY";
import { useAppSelector } from "../../redux/hooks";
import { useDeleteReviewMutation } from "../../redux/services/booksApiSlice";
//import CheckIcon from "@mui/icons-material/Check";
//import { useAppDispatch } from "../../../redux/hooks";
//import { showAlert } from "../../../redux/features/alerts/alertsSlice";

interface ReviewProps {
  review: Review;
  editReview: React.Dispatch<SetStateAction<number>>;
}
const ReviewComponent: React.FC<ReviewProps> = ({ review, editReview }) => {
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleTextVisibility = () => setIsExpanded(!isExpanded);
  const reviewText =
    isExpanded || review.description.length < 200
      ? review.description
      : review.description.slice(0, 201) + "...";

  const [deleteReview] = useDeleteReviewMutation();

  return (
    <div className={classes.review}>
      <div>
        <CustomAvatar user={review.user as User} size="m" />
      </div>
      <div className={classes.reviewContent}>
        <div className={classes.reviewHeader}>
          <div className={classes.info}>
            <span className={classes.reviewName}>{review.user.name}</span>
            <div className={classes.reviewRating}>
              <Rating
                name="read-only"
                value={review.rating}
                readOnly
                precision={0.5}
              />
            </div>
          </div>
          <span className={classes.reviewDate}>
            {formatISODateToDDMMYYYY(review.createdAt)}
          </span>
        </div>
        <div className={classes.reviewText}>{reviewText}</div>
        <div className={classes.buttons}>
          {review.description.length >= 200 && (
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

          {review.userId === currentUserId && (
            <div className={classes.iconButtons}>
              <IconButton
                aria-label="delete"
                size="small"
                color="primary"
                onClick={() => deleteReview(review.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                title="Edit review"
                aria-label="edit"
                size="small"
                color="primary"
                onClick={() => editReview(review.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
