import { dummyBooks, dummyLists } from "../../../dummyData";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { closeRemoveBookFromListModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useRemoveBookFromListMutation } from "../../../redux/services/listsApiSlice";
import WarningModal from "../../UI/WarningModal/WarningModal";

const RemoveBookFromListModal = () => {
  const bookId = useAppSelector((state) => state.modals.bookToRemoveFromListId);
  const listId = useAppSelector((state) => state.modals.listToRemoveBookFromId);
  const dispatch = useAppDispatch();
  const [removeBookFromList, { isSuccess, isError }] =
    useRemoveBookFromListMutation();

  const closeModal = () => dispatch(closeRemoveBookFromListModal());

  const onConfirm = async () => {
    if (!bookId || !listId) return;

    await removeBookFromList({ bookId, listId });
    console.log("te");

    if (isSuccess) {
      dispatch(
        showAlert({ message: "Book removed from list", severity: "success" })
      );
      closeModal();
    }

    if (isError) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
    }
  };

  const book = dummyBooks.find((book) => book.id === bookId);
  const list = dummyLists.find((list) => list.id === listId);

  if (!book || !list) {
    closeModal();
    return null;
  }

  return (
    <WarningModal
      modalOpen={!!(bookId && listId)}
      closeModal={closeModal}
      onConfirm={onConfirm}
      warningMessage={`Are you sure you want to remove ${book.title} from ${list.title}`}
    />
  );
};

export default RemoveBookFromListModal;
