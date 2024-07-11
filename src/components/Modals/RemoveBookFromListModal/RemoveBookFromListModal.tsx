import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { closeRemoveBookFromListModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useGetBookByIdQuery } from "../../../redux/services/booksApiSlice";
import {
  useGetListByIdQuery,
  useRemoveBookFromListMutation,
} from "../../../redux/services/listsApiSlice";
import WarningModal from "../../UI/WarningModal/WarningModal";

const RemoveBookFromListModal = () => {
  const dispatch = useAppDispatch();
  const bookId = useAppSelector(
    (state) => state.modals.removeBookFromListValues
  )?.bookId;

  const listId = useAppSelector(
    (state) => state.modals.removeBookFromListValues
  )?.listId;

  const { data: list } = useGetListByIdQuery(listId ?? 0, {
    skip: !listId,
  });
  const { data: book } = useGetBookByIdQuery(bookId ?? 0, {
    skip: !bookId,
  });

  const [removeBookFromList, { isError, isLoading: isRemoving }] =
    useRemoveBookFromListMutation();

  const onConfirm = async () => {
    if (!bookId || !listId) return;

    await removeBookFromList({ bookIds: [bookId], listId });
    if (!isError) {
      dispatch(
        showAlert({ message: "Book removed from list", severity: "success" })
      );
      dispatch(closeRemoveBookFromListModal());
    }

    if (isError) {
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );
    }
  };

  return (
    <WarningModal
      modalOpen={!!(bookId && listId)}
      closeModal={() => dispatch(closeRemoveBookFromListModal())}
      onConfirm={onConfirm}
      warningMessage={`Are you sure you want to remove ${book?.title} from ${list?.title}`}
      confirmButtonDisabled={isRemoving}
    />
  );
};

export default RemoveBookFromListModal;
