import { useNavigate } from "react-router-dom";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { closeDeleteListModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  useDeleteListMutation,
  useGetListByIdQuery,
} from "../../../redux/services/listsApiSlice";
import WarningModal from "../../UI/WarningModal/WarningModal";

const DeleteListModal = () => {
  const listId = useAppSelector((state) => state.modals.listToDeleteId);
  const { data: list, isSuccess: listFetchad } = useGetListByIdQuery(
    listId ?? 0,
    { skip: !listId }
  );
  const dispatch = useAppDispatch();
  const [deleteList, { isLoading }] = useDeleteListMutation();

  const onConfirm = async () => {
    if (!listId) return;

    await deleteList(listId);
  };

  return (
    <WarningModal
      modalOpen={listFetchad}
      closeModal={() => dispatch(closeDeleteListModal())}
      onConfirm={onConfirm}
      warningMessage={`Are you sure you want to remove ${list!.title}`}
      confirmButtonDisabled={isLoading}
    />
  );
};

export default DeleteListModal;
