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
import { SignUpUserPayload } from "../../../Types/users.types";
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


  const SignUpForm = useForm<SignUpUserPayload>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors } } = SignUpForm;


  const onSubmit = async (data: SignUpUserPayload) => {
    dispatch(startLoading());

    const newUserData: SignUpUserPayload = {
      ...data,
      birthDate: birthdate ? dayjs(birthdate, "DD/MM/YYYY").toDate().toISOString() : "",
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
            min: { value: 6, message: "Username should be at least 6 characters" }
          })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Username"
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: /^[a-zA-Z0-9_]{8,}$/,
              message: "Invalid username",
            },
            minLength: { value: 6, message: "Username should be at least 6 characters" }
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
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
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/,
              message: "Password should contain uppercase and lowercase characters, numbers and special characters"
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 24,
              message: "Password must be at most 24 characters long",
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
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
            {...register("gender", {
              required: "Gender is required"
            })}
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
