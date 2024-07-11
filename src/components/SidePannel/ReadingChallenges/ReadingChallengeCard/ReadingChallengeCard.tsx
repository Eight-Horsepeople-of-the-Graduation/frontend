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
          <Link to={`/challenges/${challenge.id}`} title={challenge.title}>
            {challenge.title}
          </Link>
          <p
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {convertFirstLetterToUppercase(challenge.timeframe)}
          </p>
        </div>

        <p className={classes.ChallengeCounter}>
          {challenge.progress}{" "}
          {challenge.goal ? `of ${challenge.goal}` : "Read"}
        </p>
      </div>

      <div className={classes.Progress}>
        <ProgressBar
          color={getProgressBarColor(done, expired)}
          progress={(challenge.progress / challenge.goal) * 100}
        />
      </div>
    </div>
  );
};
export default ReadingChallengeCard;
