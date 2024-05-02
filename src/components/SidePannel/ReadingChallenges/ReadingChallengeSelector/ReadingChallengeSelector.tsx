import { SetStateAction, useState } from "react";
import { Challenge } from "../../../../Types/readingChallenges.types";
import classes from "./ReadingChallengeSelector.module.css";
import ReadingChallengeCard from "../ReadingChallengeCard/ReadingChallengeCard";
import { Button } from "@mui/material";
import CreateReadingChallengeModal from "../../../Modals/CreateReadingChallengeModal/CreateReadingChallengeModal";

interface ReadingChallengeSelectorProps {
  challenges: Challenge[];
  selectedChallenge: Challenge;
  setSelectedReadingChallengeId: React.Dispatch<SetStateAction<number>>;
  setIsSelectingChallenge: React.Dispatch<SetStateAction<boolean>>;
}

const ReadingChallengeSelector = (props: ReadingChallengeSelectorProps) => {
  const [isCreatingReadingChallenge, setIsCreatingReadingChallenge] =
    useState(false);

  const closeCreateReadingChallengeModal = () =>
    setIsCreatingReadingChallenge(false);

  const unselectedChallenges = props.challenges.filter(
    (challenge) => challenge.id !== props.selectedChallenge.id
  );

  const handleSelectChallenge = (challengeId: number) => {
    props.setSelectedReadingChallengeId(challengeId);
    props.setIsSelectingChallenge(false);
  };

  return (
    <>
      <CreateReadingChallengeModal
        isCreatingReadingChallenge={isCreatingReadingChallenge}
        closeCreateReadingChallengeModal={closeCreateReadingChallengeModal}
      />
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

        {props.challenges.length < 3 && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => setIsCreatingReadingChallenge(true)}
            sx={{
              width: "calc(100% - 24px)",
              marginLeft: "12px",
            }}
          >
            Create new challenge
          </Button>
        )}
      </div>
    </>
  );
};

export default ReadingChallengeSelector;
