import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import classes from "./Auth.module.css";
import { UserCredintials } from "../../../Types/users.types";
import { useLogInMutation } from "../../../redux/services/usersApiSlice";

const LoginForm = () => {

  const [logIn] = useLogInMutation();

  const logInForm = useForm<UserCredintials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = logInForm;

  const onSubmit = async (data: UserCredintials) => {
    await logIn(data);
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
