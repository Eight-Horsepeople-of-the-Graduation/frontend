import { useState } from "react";
import ReadingChallengeSelector from "../ReadingChallengeSelector/ReadingChallengeSelector";
import ReadingChallengeCard from "../ReadingChallengeCard/ReadingChallengeCard";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../../redux/hooks";
import checkDatePassed from "../../../../helperFuctions/checkDatePassed";
import { useGetUserReadingChallengesQuery } from "../../../../redux/services/readingChallengeApiSlice";

const ReadingChallenge = () => {
  const [isSelectingChallenge, setIsSelectingChallenge] = useState(false);
  const [selectedReadingChallengeId, setSelectedReadingChallengeId] =
    useState(1);

  const userId = useAppSelector((state) => state.authUser.user?.id) ?? 0;

  const { data: userChallenges } = useGetUserReadingChallengesQuery(userId, {
    skip: !userId,
  });

  const activeChallenges =
    userChallenges?.filter(
      (challenge) => !checkDatePassed(challenge.endDate)
    ) ?? [];

  if (activeChallenges.length === 0) return <Button>Create a challenge</Button>;

  const selectedChallenge =
    activeChallenges.find(
      (challenge) => challenge.id === selectedReadingChallengeId
    ) ?? activeChallenges[0];

  return (
    <>
      {isSelectingChallenge && (
        <ReadingChallengeSelector
          challenges={activeChallenges}
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
