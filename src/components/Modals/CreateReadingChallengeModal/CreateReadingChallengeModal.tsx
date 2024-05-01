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
import CustomModal from "../../UI/CustomModal/CustomModal";
import classes from "./CreateReadingChallengeModal.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useCreateReadingChallengeMutation } from "../../../redux/services/readingChallengeApiSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";

interface CreateReadingChallengeModalProps {
  isCreatingReadingChallenge: boolean;
  closeCreateReadingChallengeModal: () => void;
}
interface FormValues {
  type: "yearly" | "monthly" | "weekly";
  goal: number;
}

const CreateReadingChallengeModal = ({
  isCreatingReadingChallenge,
  closeCreateReadingChallengeModal,
}: CreateReadingChallengeModalProps) => {
  const userId = useAppSelector((state) => state.authUser).user!.id;
  const [challengeType, setChallengeType] = useState<
    "yearly" | "monthly" | "weekly"
  >("yearly");

  const [createReadingChallenge, { isSuccess, isError }] =
    useCreateReadingChallengeMutation();

  const dispatch = useAppDispatch();
  const form = useForm<FormValues>({
    defaultValues: {
      type: "yearly",
      goal: 1,
    },
  });

  const { register, handleSubmit } = form;

  const handleSelectChallengeType = (event: SelectChangeEvent) => {
    setChallengeType(event.target.value as typeof challengeType);
  };

  const onSubmit = async (data: FormValues) => {
    await createReadingChallenge({
      ...data,
      userId,
    });

    if (isSuccess) {
      dispatch(
        showAlert({
          message: "Challenge created successfully",
          severity: "success",
        })
      );
      closeCreateReadingChallengeModal();
    }

    if (isError) {
      dispatch(
        showAlert({
          message: "Failed to create challenge",
          severity: "error",
        })
      );
    }
  };

  const buttonSx = {
    width: "128px",
    height: "42px",
  };

  return (
    <CustomModal
      isModalOpen={isCreatingReadingChallenge}
      closeModal={closeCreateReadingChallengeModal}
    >
      <div className={classes.CreateReadingChallengeModal}>
        <h1>Create reading challenge</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.Inputs}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="challenge-type"
                value={challengeType}
                label="Privacy"
                {...register("type")}
                onChange={handleSelectChallengeType}
              >
                <MenuItem value={"yearly"}>Yearly</MenuItem>
                <MenuItem value={"monthly"}>Monthly</MenuItem>
                <MenuItem value={"weekly"}>Weekly</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ height: "24px" }} />
            <TextField
              type="number"
              label="Goal"
              variant="outlined"
              // fullWidth
              {...register("goal")}
              inputProps={{
                min: 1,
                step: 1,
              }}
            />
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
              onClick={closeCreateReadingChallengeModal}
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

export default CreateReadingChallengeModal;
