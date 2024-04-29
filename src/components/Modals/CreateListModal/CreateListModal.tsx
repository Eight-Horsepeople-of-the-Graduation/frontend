import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../UI/CustomModal/CustomModal"
import classes from "./CreateListModal.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useCreateListMutation } from "../../../redux/services/listsApiSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";

interface CreateListModalProps { isCreatingList: boolean, closeCreateListModal: () => void }
interface FormValues {
    name: string,
    privacy: "private" | "puplic",
    userId: number
}

const CreateListModal = ({ isCreatingList, closeCreateListModal }: CreateListModalProps) => {
    const userId = useAppSelector(state => state.authUser).user!.id;
    const [listPrivacy, setListPricvacy] = useState<"private" | "puplic">("puplic");
    const dispatch = useAppDispatch()
    const [createList, { isSuccess, isError }] = useCreateListMutation();





    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            privacy: "puplic",
            userId
        }
    });

    const { register, handleSubmit } = form;


    const handleSelectPrivacy = (event: SelectChangeEvent) => {
        setListPricvacy(event.target.value as typeof listPrivacy);
    };

    const onSubmit = async (data: FormValues) => {
        await createList({
            booksIds: [],
            name: data.name,
            ownerId: userId
        });

        if (isError) dispatch(showAlert({ message: "Faild to create list", severity: "error" }))

        if (isSuccess) {
            dispatch(showAlert({
                message: "List created successfully",
                severity: "success"
            }));
            closeCreateListModal();
        }


    }

    return <CustomModal isModalOpen={isCreatingList} closeModal={closeCreateListModal}
    >
        <div className={classes.CreateListModal}>
            <h1>Create new list</h1>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.Inputs}>
                    <TextField
                        required
                        fullWidth
                        color="primary"
                        id="list-name"
                        label="List Name"
                        variant="outlined"
                        sx={{ marginBottom: "32px" }}
                        {...register("name", { required: true })}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="privacy-label">Privacy</InputLabel>
                        <Select
                            labelId="privacy-label"
                            id="list-privacy"
                            value={listPrivacy}
                            label="Privacy"
                            {...register("privacy")}
                            onChange={handleSelectPrivacy}
                        >
                            <MenuItem value={"puplic"}>Public</MenuItem>
                            <MenuItem value={"private"}>Private</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Box className={classes.Controlers} justifyContent="flex-end" alignItems="flex-end">
                    <Button variant="contained" type="submit" color="primary">Create</Button>
                    <Button onClick={closeCreateListModal} variant="text" color="error">Cancel</Button>
                </Box>
            </form>
        </div>
    </CustomModal >

}

export default CreateListModal;