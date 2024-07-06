import { Controller, useForm } from "react-hook-form";
import { closeAddBookToListModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../UI/CustomModal/CustomModal";
import classes from "./AddBookToListsModal.module.css";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { List } from "../../../Types/lists.types";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import {
  useAddBookToListMutation,
  useGetUserListsQuery,
  useRemoveBookFromListMutation,
} from "../../../redux/services/listsApiSlice";
import { useGetBookByIdQuery } from "../../../redux/services/booksApiSlice";

interface FormValues {
  lists: List[];
}

const AddBookToListsModal = () => {
  const dispatch = useAppDispatch();
  const bookId = useAppSelector((state) => state.modals.bookToAddToListId);
  const { data: book, isSuccess: bookDataFetched } = useGetBookByIdQuery(bookId!, { skip: !bookId });
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;


  const { data: userLists, isSuccess: userListsFetched } = useGetUserListsQuery(currentUserId, {
    skip: !currentUserId,
  });

  const currentBookLists = (bookDataFetched && userListsFetched) ? userLists?.filter(
    (list) => list.books.includes((list.books.find(book => book.id === bookId) ?? book))) : [];

  const form = useForm<FormValues>({
    defaultValues: {
      lists: currentBookLists,
    },
  });

  const closeModal = () => dispatch(closeAddBookToListModal());

  const [addBookToList, { isSuccess: bookAdded, isError: ErrorAddingBook }] =
    useAddBookToListMutation();
  const [
    removeBookFromList,
    { isSuccess: bookRemoved, isError: errorRemovingBook },
  ] = useRemoveBookFromListMutation();

  const { handleSubmit } = form;

  const onSubmit = (data: FormValues) => {
    if (!bookId || !book) return;

    const currentListsIds = (currentBookLists ?? []).map((list) => list.id);
    const newListsIds = data.lists.map((list) => list.id);

    if (
      JSON.stringify(currentListsIds.sort()) ===
      JSON.stringify(newListsIds.sort())
    ) {
      closeModal();
      return;
    }

    const addedListsIds = newListsIds.filter(
      (id) => !currentListsIds.includes(id)
    );
    const removedListsIds = currentListsIds.filter(
      (id) => !newListsIds.includes(id)
    );

    if (addedListsIds.length) {
      addedListsIds.forEach(async (listId) => {
        await addBookToList({ listId, bookIds: [bookId] });
      });
    }

    if (removedListsIds.length) {
      removedListsIds.forEach(async (listId) => {
        await removeBookFromList({ listId, bookIds: [bookId] });
      });
    }

    if (ErrorAddingBook || errorRemovingBook)
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );

    if (bookAdded || bookRemoved) {
      dispatch(
        showAlert({ message: "Book added to lists", severity: "success" })
      );

      closeModal();
    }
  };

  const buttonSx = {
    width: "128px",
    height: "42px",
  };

  if (!bookId || !book) return <></>;

  return (
    <CustomModal isModalOpen={!!bookId} closeModal={closeModal}>
      <div className={classes.Modal}>
        <h1>Add book to lists</h1>
        <div className={classes.Inputs}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="lists"
              control={form.control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  id="lists-input"
                  options={userLists ?? []}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Lists"
                      placeholder="Choose lists"
                    />
                  )}
                  defaultValue={currentBookLists ?? []}
                  onChange={(_, data) => {
                    field.onChange(data);
                    return data;
                  }}
                />
              )}
            ></Controller>
            <Box
              className={classes.Controlers}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                sx={buttonSx}
                variant="contained"
                type="submit"
                color="primary"
              >
                Add
              </Button>
              <Button
                sx={buttonSx}
                onClick={closeModal}
                variant="text"
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddBookToListsModal;
