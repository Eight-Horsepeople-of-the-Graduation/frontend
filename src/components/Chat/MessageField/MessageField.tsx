import { TextField } from "@mui/material";
import CustomAvatar from "../../UI/CustomAvatar/CustomAvatar";
import { useAppSelector } from "../../../redux/hooks";
import classes from "./MessageField.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
        InputProps={{
          endAdornment: (
            <button className={classes.Send}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          ),
          style: { borderRadius: "var(--large-border-radius)" },
        }}
      />
    </div>
  );
};

export default MessageField;
