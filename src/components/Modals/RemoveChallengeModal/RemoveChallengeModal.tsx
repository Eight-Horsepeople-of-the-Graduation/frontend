import {  dummyChallenges } from "../../../dummyData";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { closeRemoveBookFromListModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useDeleteReadingChallengeMutation } from "../../../redux/services/readingChallengeApiSlice";
import WarningModal from "../../UI/WarningModal/WarningModal";

const RemoveChallengeModal = () => {
  const challengeID = useAppSelector(
    (state) => state.modals.challengeToRemoveId
  );
  const dispatch = useAppDispatch();
  const [removeChallenge, { isSuccess, isError }] =
      useDeleteReadingChallengeMutation();

  const closeModal = () => dispatch(closeRemoveBookFromListModal());

  const onConfirm = async () => {
    if (!challengeID) return;

    await removeChallenge(challengeID );

    if (isSuccess) {
      dispatch(
        showAlert({ message: "Challenge removed", severity: "success" })
      );
      closeModal();
    }

    if (isError) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
    }
  };

  const challenge = dummyChallenges.find(
    (challenge) => challenge.id === challengeID
  );

  if (!challenge) {
    closeModal();
    return null;
  }

  return (
    <WarningModal
      modalOpen={!!(challengeID)}
      closeModal={closeModal}
      onConfirm={onConfirm}
      warningMessage={`Are you sure you want to remove ${challenge.title} from your challenges`}
    />
  );
};

export default RemoveChallengeModal;
