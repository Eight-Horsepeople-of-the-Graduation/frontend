import { useState } from "react";
import ReadingChallengeSelector from "../ReadingChallengeSelector/ReadingChallengeSelector";
import ReadingChallengeCard from "../ReadingChallengeCard/ReadingChallengeCard";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../../redux/hooks";
import { useGetUserReadingChallengesQuery } from "../../../../redux/services/readingChallengeApiSlice";
import { useDispatch } from "react-redux";
import { openCreateChallengeModal } from "../../../../redux/features/modals/modalsSlice";

const ReadingChallenge = () => {
  const dispatch = useDispatch();
  const [isSelectingChallenge, setIsSelectingChallenge] = useState(false);
  const [selectedReadingChallengeId, setSelectedReadingChallengeId] =
    useState(1);

  const userId = useAppSelector((state) => state.authUser.user?.id) ?? 0;

  const { data: userChallenges } = useGetUserReadingChallengesQuery(userId, {
    skip: !userId,
  });

  const activeChallenges =
    userChallenges?.filter((challenge) => !challenge.hasEnded) ?? [];

  if (activeChallenges.length === 0)
    return (
      <Button
        sx={{
          width: "calc(100% - 24px)",
          margin: "auto",
          border: "var(--border)",
        }}
        onClick={() => {
          dispatch(openCreateChallengeModal());
        }}
      >
        Create a challenge
      </Button>
    );

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
