import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import classes from "./EditProfilePage.module.css";
import SidePanelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import CustomAvatar from "../../../components/UI/CustomAvatar/CustomAvatar";
import { useEditUserMutation } from "../../../redux/services/usersApiSlice";
import { EditUserPayload } from "../../../Types/users.types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CountrySelector from "../../../components/UI/CountrySelector/CountrySelector";
import dayjs, { Dayjs } from "dayjs";
import convertToTitleCase from "../../../helperFuctions/capitalizeWords";

const genders = [
  { value: "MALE", title: "Male" },
  { value: "FEMALE", title: "Female" },
];

const EditProfilePage = () => {
  document.title = `Readify | Edit profile`;

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.authUser.user);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [enableChangePassword, setEnableChangePassword] = useState(false);
  const [birthdate, setbirthdate] = useState<Dayjs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserPayload>({
    defaultValues: {
      // profilePicture: user?.profilePicture,
      name: convertToTitleCase(user?.name),
      username: user?.username,
      email: user?.email,
      gender: "MALE",
      country: user?.country,
    },
  });

  const [editUser, { isLoading }] = useEditUserMutation();

  const passwordError = newPassword.length > 0 && newPassword.length < 8;

  const confirmPasswordError = newPassword !== confirmNewPassword;

  const changePasswordError = enableChangePassword && (passwordError || confirmPasswordError);

  const preventSupmit =
    !!errors.email || !!errors.name || !!errors.username || changePasswordError;

  useEffect(() => {
    if (user) {
      const userBirthdate = user?.birthDate
        ? dayjs(new Date(user?.birthDate))
        : null;

      setbirthdate(userBirthdate);
    }
  }, [user]);

  if (!user) return <Navigate to="/" />;

  const onSubmit = async (data: EditUserPayload) => {
    if (preventSupmit) return;

    // const userData = new FormData();

    // userData.append("name", data.name);
    // userData.append("username", data.username);
    // userData.append("email", data.email);
    // userData.append("profilePicture", data.profilePicture ?? "");

    // if (enableChangePassword) userData.append("password", newPassword);

    await editUser({
      id: user.id.toString(),
      info: {
        ...data,
        birthDate:
          birthdate?.toISOString() !== user.birthDate
            ? birthdate?.toISOString()
            : undefined,
        password: enableChangePassword ? newPassword : undefined
      },
    });
  };


  return (
    <SidePanelLayout>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
        <div className={classes.Avatar}>
          <CustomAvatar user={user} size="l" />
          <TextField
            type="file"
            id="profileImage"
          // {...register("profilePicture",
          //   {
          //   validate: (value) => {
          //     if (!value?.[0]) {
          //       return "Please select an image";
          //     }
          //     // You can add further validation for image size and type here
          //     return undefined;
          //   },
          // })}
          // error={!!errors.profilePicture}
          // helperText={errors.profilePicture?.message}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Name"
            id="name"
            {...register("name", { required: "First Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Username"
            id="username"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Email"
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
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
          <FormControlLabel
            control={
              <Checkbox
                title="Change password"
                checked={enableChangePassword}
                onChange={() => setEnableChangePassword((prev) => !prev)}
                inputProps={{ "aria-label": "enable change password" }}
              />
            }
            label={"Change Password"}
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="New Password"
            id="newPassword"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            error={passwordError}
            helperText={
              passwordError ? "Password should be at least 8 characters" : ""
            }
            disabled={!enableChangePassword}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={confirmNewPassword.length > 0 && confirmPasswordError}
            helperText={confirmNewPassword && confirmPasswordError ? "Password unmatched" : ""}
            disabled={!enableChangePassword}
          />
        </div>
        <div className={classes.Actions}>
          <Button
            disabled={!!preventSupmit || isLoading}
            type="submit"
            variant="contained"
            color="success"
            style={{
              color: "white",
            }}
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={() => {
              navigate(`/profile/${user.username}`);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </SidePanelLayout>
  );
};

export default EditProfilePage;
