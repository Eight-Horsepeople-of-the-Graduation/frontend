import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./Auth.module.css";

interface SignUpFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPasword, setConfirmPassword] = useState<string>("");

  const SignUpForm = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = SignUpForm;

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
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
          error={Boolean(confirmPasword && !password.includes(confirmPasword))}
          helperText={
            Boolean(confirmPasword && !password.includes(confirmPasword)) &&
            "Passwords do not match"
          }
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
