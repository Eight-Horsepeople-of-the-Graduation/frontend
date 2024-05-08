import { User } from "../../../Types/users.types";
import { useAppSelector } from "../../../redux/hooks";
import CustomAvatar from "../../UI/CustomAvatar/CustomAvatar";
import classes from "./ChatMessage.module.css";
import logo from "../../../assets/images/logo.png";

interface ChatMessageProps {
  message: string;
  fromAi: boolean;
}

export const Ai: User = {
  email: "ai@readify.com",
  id: 0,
  image: logo,
  name: "A I",
  role: "Ai",
  username: "Ai",
};

const ChatMessage = ({ message, fromAi }: ChatMessageProps) => {
  const user = useAppSelector((state) => state.authUser.user);
  return (
    <div className={classes.ChatMessage}>
      <CustomAvatar
        user={fromAi ? Ai : user!}
        size="m"
        style={{ boxShadow: "var(--shadow-far)" }}
      />
      <div className={classes.Message}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
