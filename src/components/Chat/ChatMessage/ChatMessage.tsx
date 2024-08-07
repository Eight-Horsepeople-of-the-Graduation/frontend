import { ReactNode } from "react";
import { useAppSelector } from "../../../redux/hooks";
import CustomAvatar from "../../UI/CustomAvatar/CustomAvatar";
import AiUser from "../AiUser";
import classes from "./ChatMessage.module.css";

interface ChatMessageProps {
  message: ReactNode;
  fromAi: boolean;
}

const ChatMessage = ({ message, fromAi }: ChatMessageProps) => {
  const user = useAppSelector((state) => state.authUser.user);
  return (
    <div className={classes.ChatMessage}>
      <CustomAvatar
        user={fromAi ? AiUser : user!}
        size="m"
        style={{ boxShadow: "var(--shadow-far)" }}
      />
      <div className={classes.Message}>{message}</div>
    </div>
  );
};

export default ChatMessage;
