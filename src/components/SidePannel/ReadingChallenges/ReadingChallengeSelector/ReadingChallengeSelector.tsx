import { SetStateAction } from "react";
import { Challenge } from "../../../../Types/readingChallengeTypes";
import classes from "./ReadingChallengeSelector.module.css";
import ReadingChallengeCard from "../ReadingChallengeCard/ReadingChallengeCard";
import { Button } from "@mui/material";

interface ReadingChallengeSelectorProps {
  challenges: Challenge[];
  selectedChallenge: Challenge;
  setSelectedReadingChallengeId: React.Dispatch<SetStateAction<number>>;
  setIsSelectingChallenge: React.Dispatch<SetStateAction<boolean>>;
}

const ReadingChallengeSelector = (props: ReadingChallengeSelectorProps) => {
  const unselectedChallenges = props.challenges.filter(
    (challenge) => challenge.id !== props.selectedChallenge.id
  );

  const handleSelectChallenge = (challengeId: number) => {
    props.setSelectedReadingChallengeId(challengeId);
    props.setIsSelectingChallenge(false);
  };
  return (
    <div className={classes.SelectorCard}>
      <ReadingChallengeCard
        selected={true}
        challenge={props.selectedChallenge}
        onClickAction={() => props.setIsSelectingChallenge(false)}
      />

      {unselectedChallenges.map((challenge) => (
        <ReadingChallengeCard
          selected={false}
          key={challenge.id}
          challenge={challenge}
          onClickAction={() => handleSelectChallenge(challenge.id)}
        />
      ))}

      <Button
        variant="contained"
        fullWidth
        onClick={() => props.setIsSelectingChallenge(false)}
        sx={{
          width: "calc(100% - 24px)",
          marginLeft: "12px",
        }}
      >
        Create new challenge
      </Button>
    </div>
  );
};

export default ReadingChallengeSelector;
