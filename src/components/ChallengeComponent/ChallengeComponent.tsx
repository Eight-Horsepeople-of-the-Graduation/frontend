import { useAppDispatch } from "../../redux/hooks";
import {
  startLoading,
  stopLoading,
} from "../../redux/features/modals/modalsSlice";
import { showAlert } from "../../redux/features/alerts/alertsSlice";
import BookComponent from "../BookComponent/BookComponent";
import classes from "./ChallengeComponent.module.css";
import { Button, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useEditReadingChallengeMutation } from "../../redux/services/readingChallengeApiSlice";
import { Challenge } from "../../Types/readingChallenges.types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import { openRemoveChallengeModel } from "../../redux/features/modals/modalsSlice";

interface ChallengeProps {
  challenge: Challenge;
}

const ChallengeComponent: React.FC<ChallengeProps> = ({ challenge }) => {
  const dispatch = useAppDispatch();
  const [isEditingTitle, setISEditngTitle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [editChallengeTitle, { isSuccess, isError }] =
    useEditReadingChallengeMutation();

        
    const removeChallenge = () => {
      dispatch(openRemoveChallengeModel(challenge.id));
   };
   
  const startEditName = () => {
    setISEditngTitle(true);
   };
   
  const finishEditName = async () => {
    dispatch(startLoading());
    setISEditngTitle(false);
    if (!challenge) return;

 
    const title = titleRef.current?.innerText;

    if (!title) {
      titleRef.current!.innerText = challenge?.title ?? "Untitled";
      return;
    }

    if (title === challenge.title) return;

    await editChallengeTitle({
      id: challenge.id,
      challengeData: {
        title: challenge.title,
      },
    });
    if (isError) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
      titleRef.current.innerText = challenge.title;
    }

    if (isSuccess) {
      dispatch(
        showAlert({
          message: "Challenge name updated successfully",
          severity: "success",
        })
      );
    }

    dispatch(stopLoading());
  };

  titleRef.current?.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await finishEditName();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      titleRef.current!.innerText = challenge?.title ?? "Untitled";
      setISEditngTitle(false);
    }
  });

  return (
    <div>
      <div key={challenge.id} className={classes.Container}>
        <div className={classes.ListHeader}>
          <h1
            className={classes.ListTitle}
            ref={titleRef}
            contentEditable={isEditingTitle}
          >
            {challenge.title}
          </h1>
          <div className={classes.Controllers}>
            <Button
              title={isEditingTitle ? "Save" : "Edit Challenge name"}
              aria-label="edit"
              sx={{
                fontSize: "24px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                minWidth: "36px",
              }}
              color="primary"
              onClick={isEditingTitle ? finishEditName : startEditName}
            >
              {isEditingTitle ? <CheckIcon /> : <EditIcon />}
            </Button>
            <IconButton
              aria-label="delete"
              sx={{
                fontSize: "24px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                minWidth: "36px",
              }}
              color="primary"
              onClick={removeChallenge}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.Data}>
          <div>
            <h3>Started on</h3>
            <p>{challenge.startDate}</p>
          </div>
          <div>
            <h3>Ends on</h3>
            <p>{challenge.endDate}</p>
          </div>
          <div>
            <h3>Type</h3>
            <p>{challenge.type}</p>
          </div>
          <div>
            <h3>Goal</h3>
            <p>{challenge.goal === 1 ? "1 book" : challenge.goal + " books"}</p>
          </div>
        </div>
      </div>
      <div>
        <ProgressBar
          progress={
            ((challenge.books?.length || 0) / (challenge.goal || 1)) * 100
          }
        />
      </div>
      <div className={classes.List}>
        {challenge?.books.map((book) => (
          <BookComponent key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ChallengeComponent;
