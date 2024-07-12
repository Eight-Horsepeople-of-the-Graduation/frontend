import classes from "../Review.module.css";
import { Button, Rating, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { AddReview, Review } from "../../../Types/books.types";
import CustomAvatar from "../../UI/CustomAvatar/CustomAvatar";
import { useAppSelector } from "../../../redux/hooks";
import { formatISODateToDDMMYYYY } from "../../../helperFuctions/formatISODateToDDMMYYYY";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAddReviewMutation } from "../../../redux/services/booksApiSlice";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";

interface AddReviewProps {
  reviewToEdit?: Review;
  bookId: number;
  doneEditing?: () => void;
}

interface formData {
  description: string;
}

const AddReviewComponent: React.FC<AddReviewProps> = ({
  reviewToEdit,
  bookId,
  doneEditing,
}) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.authUser.user);
  const [rating, setRating] = useState(reviewToEdit?.rating ?? 0);

  const [addNewReview, { isSuccess, isError, isLoading }] =
    useAddReviewMutation();

  const handleChangeRating = (value: number | null) => {
    if (value) setRating(value);
  };

  const form = useForm<formData>({
    defaultValues: {
      description: reviewToEdit?.description ?? "",
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = async (data: formData) => {
    if (reviewToEdit) {
      return;
    } else {
      console.log(bookId);
      const newReview: AddReview = {
        bookId,
        rating,
        userId: user!.id,
        title: user?.name ?? "",
        description: data.description,
      };

      await addNewReview(newReview);

      if (isError) {
        dispatch(
          showAlert({ message: "Couldn't submit review", severity: "error" })
        );
      }

      if (isSuccess || !isError) {
        form.reset();
      }
    }
  };

  return (
    <div className={classes.review}>
      <div>
        <CustomAvatar user={user!} size="m" />
      </div>
      <form
        className={classes.reviewContent}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.reviewHeader}>
          <div className={classes.info}>
            <span className={classes.reviewName}>{user!.name}</span>
            <div className={classes.reviewRating}>
              <Rating
                name="rating"
                value={rating}
                precision={0.5}
                onChange={(_, v) => handleChangeRating(v)}
              />
            </div>
          </div>

          {reviewToEdit && (
            <span className={classes.reviewDate}>
              {formatISODateToDDMMYYYY(reviewToEdit.createdAt)}
            </span>
          )}
        </div>
        <TextField multiline {...register("description")} />
        <div className={classes.buttons}>
          {reviewToEdit ? (
            <IconButton
              title="Done Editing"
              aria-label="Done"
              size="small"
              color="primary"
              onClick={doneEditing}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          ) : (
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddReviewComponent;
