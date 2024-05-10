import React from "react";
import classes from "./ReadingChallengeCard.module.css";
import ProgressBar from "../../../UI/ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
import convertFirstLetterToUppercase from "../../../../helperFuctions/convertFirstLetterToUppercase";
import { Challenge } from "../../../../Types/readingChallenges.types";
import checkDatePassed from "../../../../helperFuctions/checkDatePassed";

interface ChallengeCardProps {
  challenge: Challenge;
  selected: boolean;
  onClickAction?: () => void;
}

const getProgressBarColor = (done: boolean, expired: boolean) => {
  if (done) return "var(--dark-success-color)";
  if (expired) return "var(--dark-gray-color)";
  return undefined;
};

const ReadingChallengeCard = ({
  challenge,
  selected,
  onClickAction,
}: ChallengeCardProps) => {
  const expired = checkDatePassed(challenge.endDate);

  const done = challenge.books.length >= challenge.goal;

  return (
    <div
      onClick={onClickAction}
      className={[
        classes.Card,
        selected && classes.Selected,
        expired && classes.Expired,
        done && classes.Done,
      ].join(" ")}
    >
      <div className={classes.Info}>
        <div className={classes.ChallengeInfo}>
          <p>
            {convertFirstLetterToUppercase(challenge.type.toLowerCase())}{" "}
            Challenge
          </p>
          <Link to={`/challenges/${challenge.id}`} title="Go to challenge">
            {convertFirstLetterToUppercase(challenge.period)}
          </Link>
        </div>

        <p className={classes.ChallengeCounter}>
          {challenge.books.length} of {challenge.goal}
        </p>
      </div>

      <div className={classes.Progress}>
        <ProgressBar
          color={getProgressBarColor(done, expired)}
          progress={(challenge.books.length / challenge.goal) * 100}
        />
      </div>
    </div>
  );
};
export default ReadingChallengeCard;
