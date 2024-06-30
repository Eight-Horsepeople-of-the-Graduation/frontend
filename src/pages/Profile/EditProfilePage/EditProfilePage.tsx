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

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.authUser.user);
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const [enableChangePassword, setEnableChangePassword] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues: user! });

    const [editUser, { isSuccess, isError }] = useEditUserMutation();

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
        console.log(data);
        dispatch(startLoading());

        await editUser({ id: user.id.toString(), info: data })

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
                        error={!!newPassword && newPassword.length < 8}
                        helperText={!!newPassword && newPassword.length < 8 ? "Password should be at least 8 characters" : ""}
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
                        error={!!confirmNewPassword && newPassword !== confirmNewPassword}
                        helperText={!!confirmNewPassword && newPassword !== confirmNewPassword ? "Password unmatched" : ""}
                        disabled={!enableChangePassword}


                    />
                </div>
                <div className={classes.Actions}>
                    <Button type="submit" variant="contained" color="success">
                        Save Changes
                    </Button>
                    <Button type="reset" variant="outlined" color="error">
                        Cancel
                    </Button>
                </div>
            </form>
        </SidePannelLayout >
    );
};

export default EditProfilePage;