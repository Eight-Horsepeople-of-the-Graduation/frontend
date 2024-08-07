import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { closeRemoveChallengeModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  useDeleteReadingChallengeMutation,
  useGetReadingChallengeByIdQuery,
} from "../../../redux/services/readingChallengeApiSlice";
import WarningModal from "../../UI/WarningModal/WarningModal";

const RemoveChallengeModal = () => {
  const challengeID =
    useAppSelector((state) => state.modals.challengeToRemoveId) ?? 0;

  const { data: challenge } = useGetReadingChallengeByIdQuery(challengeID, {
    skip: !challengeID,
  });
  const dispatch = useAppDispatch();
  const [removeChallenge, { isLoading }] =
    useDeleteReadingChallengeMutation();

  const closeModal = () => dispatch(closeRemoveChallengeModal());

  const onConfirm = async () => {
    if (!challengeID) return;

    const { data: removedChallenge, error } = await removeChallenge(
      challengeID
    );

    if (removedChallenge && !error) {
      dispatch(
        showAlert({ message: "Challenge removed", severity: "success" })
      );
      closeModal();
    }

    if (error) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
    }
  };

  return (
    <WarningModal
      modalOpen={!!challengeID}
      closeModal={closeModal}
      onConfirm={onConfirm}
      confirmButtonDisabled={isLoading}
      warningMessage={`Are you sure you want to remove ${
        challenge ? challenge?.title : "this challenge"
      } from your challenges`}
    />
  );
};

export default RemoveChallengeModal;
