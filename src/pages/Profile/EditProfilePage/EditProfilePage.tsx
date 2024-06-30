import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import classes from "./EditProfilePage.module.css";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import CustomAvatar from "../../../components/UI/CustomAvatar/CustomAvatar";

const EditProfilePage = () => {

    const user = useAppSelector(state => state.authUser.user);
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [errorTexts, setErrorTexts] = useState({
        password: "",
        confirmPassword: "",
    });
    const [enableChangePassword, setEnableChangePassword] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues: user! });

    // const saveInfo = () => 

    // Fetch initial data if needed (for edit scenario)
    useEffect(() => {
        if (user) {
            // Set initial values from props (if editing)
            setValue('image', user.image ?? "");
            setValue('name', user.name ?? "");
            setValue('username', user.username ?? "");
            setValue('email', user.email ?? "");
        }
    }, [user, setValue]);

    if (!user) return <Navigate to="/" />;

    const onSubmit = () => {
        if (newPassword.length < 8) { setErrorTexts({ ...errorTexts, password: "Password should be at least 8 characters" }) } else {
            setErrorTexts({ ...errorTexts, password: "" })
        }

        if (confirmNewPassword !== newPassword) { setErrorTexts({ ...errorTexts, confirmPassword: "Password unmatched" }) } else {
            setErrorTexts({ ...errorTexts, confirmPassword: "" })
        }



    };

    return (
        <SidePannelLayout>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
                <div>
                    <CustomAvatar user={user} size="l" />
                    <TextField
                        fullWidth
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
                        error={newPassword.length < 8}
                        helperText={errorTexts.password}
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
                        error={newPassword !== confirmNewPassword}
                        helperText={errorTexts.confirmPassword}
                        disabled={!enableChangePassword}


                    />
                </div>
                <Button type="submit" variant="contained">
                    Save Changes
                </Button>
            </form>
        </SidePannelLayout>
    );
};

export default EditProfilePage;