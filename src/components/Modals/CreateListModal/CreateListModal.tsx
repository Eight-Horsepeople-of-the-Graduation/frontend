import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../UI/CustomModal/CustomModal";
import classes from "./CreateListModal.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateListMutation } from "../../../redux/services/listsApiSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { Privacy } from "../../../Types/lists.types";
import { closeCreateListModal } from "../../../redux/features/modals/modalsSlice";

interface FormValues {
  title: string;
  privacy: Privacy;
  userId: number;
  description: string;
}

const CreateListModal = () => {
  const userId = useAppSelector((state) => state.authUser).user!.id;
  const [listPrivacy, setListPricvacy] = useState<"private" | "puplic">(
    "puplic"
  );
  const dispatch = useAppDispatch();
  const [createList, { isSuccess, isError }] = useCreateListMutation();

  const modalOpen = useAppSelector((state) => state.modals.createListModalOpen);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      privacy: "PUBLIC",
      userId,
    },
  });

  const { register, handleSubmit } = form;

  const handleSelectPrivacy = (event: SelectChangeEvent) => {
    setListPricvacy(event.target.value as typeof listPrivacy);
  };

  const closeModal = () => dispatch(closeCreateListModal());

  const onSubmit = async (data: FormValues) => {
    await createList({
      title: data.title,
      userId,
      privacy: data.privacy,
      description: data.description,
    });

    if (isError)
      dispatch(
        showAlert({ message: "Faild to create list", severity: "error" })
      );

    if (isSuccess) {
      dispatch(
        showAlert({
          message: "List created successfully",
          severity: "success",
        })
      );
      closeModal();
    }
  };

  const buttonSx = {
    width: "128px",
    height: "42px",
  };

  return (
    <CustomModal isModalOpen={modalOpen} closeModal={closeModal}>
      <div className={classes.CreateListModal}>
        <h1>Create new list</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.Inputs}>
            <TextField
              required
              fullWidth
              color="primary"
              id="list-name"
              label="List Name"
              variant="outlined"
              sx={{ marginBottom: "32px" }}
              {...register("title", { required: true })}
            />
            <TextField
              fullWidth
              color="primary"
              id="list-description"
              label="Description"
              variant="outlined"
              sx={{ marginBottom: "32px" }}
              {...register("description", { required: false })}
            />
            <FormControl fullWidth>
              <InputLabel id="privacy-label">Privacy</InputLabel>
              <Select
                labelId="privacy-label"
                id="list-privacy"
                value={listPrivacy}
                label="Privacy"
                {...register("privacy")}
                onChange={handleSelectPrivacy}
              >
                <MenuItem value={"PUPLIC"}>Public</MenuItem>
                <MenuItem value={"PRIVATE"}>Private</MenuItem>
              </Select>
            </FormControl>
          </div>

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
              Create
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
    </CustomModal>
  );
};

export default CreateListModal;
