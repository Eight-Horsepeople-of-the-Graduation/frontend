import { SetStateAction } from "react";
import { Challenge } from "../../../../Types/readingChallengeTypes";
import classes from "./ReadingChallengeSelector.module.css";
import ReadingChallengeCard from "../ReadingChallengeCard/ReadingChallengeCard";
import { useAppDispatch } from "../../../../redux/hooks";
import { selectChallenge } from "../../../../redux/features/readingChallenges/readingChallengeSlice";

interface ReadingChallengeSelectorProps {
  challenges: Challenge[];
  selectedChallenge: Challenge;
  setIsSelectingChallenge: React.Dispatch<SetStateAction<boolean>>;
}

const ReadingChallengeSelector = (props: ReadingChallengeSelectorProps) => {
  const unselectedChallenges = props.challenges.filter(
    (challenge) => challenge.id !== props.selectedChallenge.id
  );

  const dispatch = useAppDispatch();

  const handleSelectChallenge = (challengeId: number) => {
    dispatch(selectChallenge(challengeId));
    props.setIsSelectingChallenge(false);
  };
  return (
    <div className={classes.SelectorCard}>
      <ReadingChallengeCard
        challenge={props.selectedChallenge}
        selected={true}
        onClickAction={() => props.setIsSelectingChallenge(false)}
      />

      {unselectedChallenges.map((challenge) => (
        <ReadingChallengeCard
          key={challenge.id}
          challenge={challenge}
          selected={false}
          onClickAction={() => handleSelectChallenge(challenge.id)}
        />
      ))}
    </div>
  );
};

export default ReadingChallengeSelector;
