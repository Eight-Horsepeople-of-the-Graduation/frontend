import { TextField } from "@mui/material";
import CustomAvatar from "../../UI/CustomAvatar/CustomAvatar";
import { useAppSelector } from "../../../redux/hooks";
import classes from "./MessageField.module.css";

const MessageField = () => {
  const user = useAppSelector((state) => state.authUser.user);

  return (
    <div className={classes.MessageField}>
      <CustomAvatar user={user!} />
      <TextField
        sx={{
          width: "100%",
          backgroundColor: "white",
          border: "var(--gray-color)",
        }}
      />
    </div>
  );
};

export default MessageField;
