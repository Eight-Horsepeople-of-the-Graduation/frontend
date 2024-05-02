import React from "react";
import classes from "./ReadingChallengeCard.module.css";
import ProgressBar from "../../../UI/ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
import convertFirstLetterToUppercase from "../../../../helperFuctions/convertFirstLetterToUppercase";

interface ChallengeCardProps {
  challenge: {
    goal: number;
    progress: number;
    id: number;
    type: string;
    period: string;
  };
  selected: boolean;
  onClickAction?: () => void;
}

const ReadingChallengeCard = ({
  challenge,
  selected,
  onClickAction,
}: ChallengeCardProps) => {
  return (
    <div
      onClick={onClickAction}
      className={[classes.Card, selected && classes.Selected].join(" ")}
    >
      <div className={classes.Info}>
        <div className={classes.ChallengeInfo}>
          <p>{convertFirstLetterToUppercase(challenge.type)} Challenge</p>
          <Link to={`/challenges/${challenge.id}`} title="Go to challenge">
            {convertFirstLetterToUppercase(challenge.period)}
          </Link>
        </div>

        <p className={classes.ChallengeCounter}>
          {challenge.progress} of {challenge.goal}
        </p>
      </div>

      <div className={classes.Progress}>
        <ProgressBar progress={(challenge.progress / challenge.goal) * 100} />
      </div>
    </div>
  );
};
export default ReadingChallengeCard;
