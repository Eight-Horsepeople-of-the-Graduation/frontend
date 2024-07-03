import { Button, TextField } from "@mui/material";
import { set, useForm } from "react-hook-form";
import classes from "./Auth.module.css";
import { UserCredintials } from "../../../Types/users.types";
import { useAppDispatch } from "../../../redux/hooks";
import {
  startLoading,
  stopLoading,
} from "../../../redux/features/modals/modalsSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { setLogedInUser } from "../../../redux/features/users/authSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [logIn, { data: logedInUser, isError, isSuccess }] = useLogInMutation();

  const logInForm = useForm<UserCredintials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = logInForm;

  const onSubmit = async (data: UserCredintials) => {
    dispatch(startLoading());

    await logIn(data);

    dispatch(stopLoading());

    if (isError) {
      dispatch(
        showAlert({ message: "Invalid email or password", severity: "error" })
      );

      if (isSuccess) {
        dispatch(setLogedInUser(logedInUser));
        dispatch(
          showAlert({ message: "Logged in successfully", severity: "success" })
        );
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
      <div>
        <TextField
          fullWidth
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          error={Boolean(logInForm.formState.errors.email)}
          helperText={logInForm.formState.errors.email?.message}
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
          error={Boolean(logInForm.formState.errors.password)}
          helperText={logInForm.formState.errors.password?.message}
        />
      </div>

      <div>
        <Button fullWidth type="submit" variant="contained" color="primary">
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
function useLogInMutation(): [
  any,
  { data: any; isError: any; isSuccess: any }
] {
  throw new Error("Function not implemented.");
}
