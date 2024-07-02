import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import classes from "./EditProfilePage.module.css";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import CustomAvatar from "../../../components/UI/CustomAvatar/CustomAvatar";
import { useEditUserMutation } from "../../../redux/services/usersApiSlice";
import { User } from "../../../Types/users.types";
import { startLoading, stopLoading } from "../../../redux/features/modals/modalsSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";

const EditProfilePage = () => {

    document.title = `Readify | Edit profile`;


    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.authUser.user);
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const [enableChangePassword, setEnableChangePassword] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues: user! });

    const [editUser, { isSuccess, isError }] = useEditUserMutation();

    const passwordError = !!newPassword && newPassword.length < 8;
    const confirmPasswordError = !!confirmNewPassword && newPassword !== confirmNewPassword;
    const changePasswordError = enableChangePassword && passwordError || confirmNewPassword;
    const preventSupmit = !!errors.email || !!errors.name || !!errors.username || changePasswordError;


    useEffect(() => {
        if (user) {
            setValue('image', user.image ?? "");
            setValue('name', user.name ?? "");
            setValue('username', user.username ?? "");
            setValue('email', user.email ?? "");
        }
    }, [user, setValue]);

    if (!user) return <Navigate to="/" />;

    const onSubmit = async (data: User) => {
        if (preventSupmit) return;

        const userData = new FormData();

        userData.append("name", data.name);
        userData.append("username", data.username);
        userData.append("email", data.email);
        userData.append("image", data.image)

        if (enableChangePassword) userData.append("password", newPassword)

        dispatch(startLoading());

        await editUser({ id: user.id.toString(), info: userData })

        dispatch(stopLoading());

        if (isSuccess) {
            dispatch(showAlert({
                message: "Info updated",
                severity: "success"
            }))
            navigate(`/profile/${user.username}`)
        }

        if (isError) {
            dispatch(showAlert({
                message: "Something happened",
                severity: "error"
            }))
        }
    };

    return (
        <SidePannelLayout>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
                <div className={classes.Avatar}>
                    <CustomAvatar user={user} size="l" />
                    <TextField
                        type="file"
                        id="profileImage"
                        {...register('image', {
                            validate: (value) => {
                                if (!value?.[0]) {
                                    return 'Please select an image';
                                }
                                // You can add further validation for image size and type here
                                return undefined;
                            },
                        })}
                        error={!!errors.image}
                        helperText={errors.image?.message}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Name"
                        id="name"
                        {...register('name', { required: 'First Name is required' })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Username"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
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
                        {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email format' } })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </div>

                <div>
                    <FormControlLabel
                        control={<Checkbox
                            title="Change password"
                            checked={enableChangePassword}
                            onChange={() => setEnableChangePassword(prev => !prev)}
                            inputProps={{ 'aria-label': 'enable change password' }} />} label={"Change Password"} />
                </div>

                <div>
                    <TextField
                        fullWidth

                        label="New Password"
                        id="newPassword"
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? "Password should be at least 8 characters" : ""}
                        disabled={!enableChangePassword}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        id="confirmPassword"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        error={confirmPasswordError}
                        helperText={confirmPasswordError ? "Password unmatched" : ""}
                        disabled={!enableChangePassword}


                    />
                </div>
                <div className={classes.Actions}>
                    <Button
                        disabled={!!preventSupmit} type="submit" variant="contained" color="success">
                        Save Changes
                    </Button>
                    <Button type="button" variant="outlined" color="error" onClick={()=>{
                        navigate(`/profile/${user.username}`)
                    }}>
                        Cancel
                    </Button>
                </div>
            </form>
        </SidePannelLayout >
    );
};

export default EditProfilePage;