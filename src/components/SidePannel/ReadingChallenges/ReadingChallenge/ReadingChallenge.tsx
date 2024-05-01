import { useState } from "react";
import ReadingChallengeSelector from "../ReadingChallengeSelector/ReadingChallengeSelector";
import ReadingChallengeCard from "../ReadingChallengeCard/ReadingChallengeCard";
import { Button } from "@mui/material";
import { Challenge } from "../../../../Types/readingChallengeTypes";

const challenges: Challenge[] = [
  {
    id: 1,
    goal: 100,
    progress: 90,
    type: "yearly",
    period: "2024",
    userId: 1,
  },
  {
    id: 2,
    goal: 8,
    progress: 6,
    type: "monthly",
    period: "april",
    userId: 1,
  },
];
const ReadingChallenge = () => {
  const [isSelectingChallenge, setIsSelectingChallenge] = useState(false);
  const [selectedReadingChallengeId, setSelectedReadingChallengeId] =
    useState(1);

  if (challenges.length === 0) return <Button>Create a challenge</Button>;

  const selectedChallenge =
    challenges.find(
      (challenge) => challenge.id === selectedReadingChallengeId
    ) ?? challenges[0];

  return (
    <>
      {isSelectingChallenge && (
        <ReadingChallengeSelector
          challenges={challenges}
          selectedChallenge={selectedChallenge}
          setIsSelectingChallenge={setIsSelectingChallenge}
          setSelectedReadingChallengeId={setSelectedReadingChallengeId}
        />
      )}
      <ReadingChallengeCard
        challenge={selectedChallenge}
        selected={false}
        onClickAction={() => setIsSelectingChallenge(true)}
      />
    </>
  );
};

export default ReadingChallenge;
