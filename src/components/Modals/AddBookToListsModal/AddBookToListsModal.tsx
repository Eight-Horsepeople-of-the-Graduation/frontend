import { Controller, useForm } from "react-hook-form";
import { closeAddBookToListModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../UI/CustomModal/CustomModal";
import classes from "./AddBookToListsModal.module.css";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { dummyLists } from "../../../dummyData";
import { List } from "../../../Types/lists.types";
import { Book } from "../../../Types/books.types";
import { useAddBookToMultibleListsMutation } from "../../../redux/services/listsApiSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";

interface FormValues {
  lists: List[];
}

const AddBookToListsModal = () => {
  const dispatch = useAppDispatch();
  const bookId = useAppSelector((state) => state.modals.bookToAddToListId);

  const closeModal = () => dispatch(closeAddBookToListModal());

  const listsBookIn = dummyLists.filter((list) =>
    list.books.some((book: Book) => book.id === bookId)
  );

  const form = useForm<FormValues>({
    defaultValues: {
      lists: dummyLists.slice(0, 2),
    },
  });

  const [addBookToLists, { isSuccess, isError }] =
    useAddBookToMultibleListsMutation();

  const { handleSubmit } = form;

  const onSubmit = async (data: FormValues) => {
    if (JSON.stringify(data.lists) === JSON.stringify(listsBookIn)) {
      closeModal();
      return;
    }

    await addBookToLists({
      bookId: bookId!,
      listsIds: data.lists.map((list) => list.id),
    });

    if (isError)
      dispatch(
        showAlert({ message: "Something went wrong", severity: "error" })
      );

    if (isSuccess) {
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
                  options={dummyLists}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Lists"
                      placeholder="Choose lists"
                    />
                  )}
                  defaultValue={listsBookIn}
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
