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
import {
  ChallengeType,
  CreateChallengePayload,
} from "../../../Types/readingChallenges.types";
import { closeCreateChallengeModal } from "../../../redux/features/modals/modalsSlice";
import convertFirstLetterToUppercase from "../../../helperFuctions/convertFirstLetterToUppercase";

const CreateReadingChallengeModal = () => {
  const userId = useAppSelector((state) => state.authUser).user?.id;
  const [challengeType, setChallengeType] = useState<ChallengeType>("ANNUAL");
  const modalOpen = useAppSelector(
    (state) => state.modals.createChallengeModalOpen
  );

  const [createReadingChallenge, { isLoading }] =
    useCreateReadingChallengeMutation();

  const dispatch = useAppDispatch();
  const form = useForm<CreateChallengePayload>({
    defaultValues: {
      title:
        convertFirstLetterToUppercase(challengeType.toLowerCase()) +
        " Challenge",
      type: challengeType,
      goal: 1,
    },
  });

  const { register, handleSubmit } = form;

  const handleSelectChallengeType = (event: SelectChangeEvent) => {
    setChallengeType(event.target.value as typeof challengeType);
  };

  const closeModal = () => {
    dispatch(closeCreateChallengeModal());
  };

  const onSubmit = async (data: CreateChallengePayload) => {
    if (!userId) return;
    const { data: createdChallenge, error } = await createReadingChallenge({
      ...data,
      goal: Number(data.goal),
      userId,
    });

    if (createdChallenge && !error) {
      dispatch(
        showAlert({
          message: "Challenge created successfully",
          severity: "success",
        })
      );
      closeModal();
    }

    if (error) {
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

  const challengeSelectorOptions: { title: string; value: ChallengeType }[] = [
    {
      title: "Annual",
      value: "ANNUAL",
    },
    {
      title: "Monthly",
      value: "MONTHLY",
    },
    {
      title: "Weekly",
      value: "WEEKLY",
    },
  ];

  return (
    <CustomModal isModalOpen={modalOpen} closeModal={closeModal}>
      <div className={classes.CreateReadingChallengeModal}>
        <h1>Create reading challenge</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.Inputs}>
            <TextField
              type="text"
              label="Title"
              variant="outlined"
              fullWidth
              {...register("title")}
            />
            <Box sx={{ height: "24px" }} />

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
                {challengeSelectorOptions.map((option, idx) => (
                  <MenuItem value={option.value} key={idx}>
                    {option.title}
                  </MenuItem>
                ))}
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
              disabled={isLoading}
            >
              Create
            </Button>
            <Button
              sx={buttonSx}
              onClick={closeModal}
              variant="text"
              color="error"
              disabled={isLoading}
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
