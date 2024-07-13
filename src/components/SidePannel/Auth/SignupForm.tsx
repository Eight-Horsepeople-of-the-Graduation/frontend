import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./Auth.module.css";
import { useSignUpMutation } from "../../../redux/services/usersApiSlice";
import { SignUpUser } from "../../../Types/users.types";
import { useAppDispatch } from "../../../redux/hooks";
import { startLoading } from "../../../redux/features/modals/modalsSlice";
import CountrySelector from "../../UI/CountrySelector/CountrySelector";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const genders = [
  { value: "MALE", title: "Male" },
  { value: "FEMALE", title: "Female" },
];

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>("");
  const [confirmPasword, setConfirmPassword] = useState<string>("");
  const [birthdate, setbirthdate] = useState<Dayjs | null>(null);

  const [signUp] = useSignUpMutation();

  const matchPasswordError = Boolean(
    confirmPasword && !password.includes(confirmPasword)
  );

  const SignUpForm = useForm<SignUpUser>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = SignUpForm;

  const onSubmit = async (data: SignUpUser) => {
    dispatch(startLoading());

    const newUserData: SignUpUser = {
      ...data,
      isAdmin: false,
      profilePicture: "",
      birthDate: dayjs(birthdate, "DD/MM/YYYY").toDate().toISOString(),
    };

    await signUp(newUserData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
      <div>
        <TextField
          fullWidth
          label="Name"
          {...register("name", {
            required: "Name is required",
          })}
          error={Boolean(SignUpForm.formState.errors.name)}
          helperText={SignUpForm.formState.errors.name?.message}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Username"
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: /^[a-zA-Z0-9_]{1,15}$/,
              message: "Invalid username",
            },
          })}
          error={Boolean(SignUpForm.formState.errors.username)}
          helperText={SignUpForm.formState.errors.username?.message}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          error={Boolean(SignUpForm.formState.errors.email)}
          helperText={SignUpForm.formState.errors.email?.message}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          error={Boolean(SignUpForm.formState.errors.password)}
          helperText={SignUpForm.formState.errors.password?.message}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          error={matchPasswordError}
          helperText={matchPasswordError && "Passwords do not match"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              sx={{
                width: "100%",
                "& > div ": {
                  borderRadius: "var(--large-border-radius)",
                },
              }}
              label="Birthdate"
              format="DD/MM/YYYY"
              value={birthdate}
              onChange={(newValue) => setbirthdate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div>
        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>

          <Select
            fullWidth
            labelId="gender-label"
            id="gender"
            label="Gender"
            {...register("gender")}
          >
            {genders.map((option, idx) => (
              <MenuItem value={option.value} key={idx}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <CountrySelector register={{ ...register("country") }} />
      </div>

      <div>
        <Button fullWidth type="submit" variant="contained" color="primary">
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
