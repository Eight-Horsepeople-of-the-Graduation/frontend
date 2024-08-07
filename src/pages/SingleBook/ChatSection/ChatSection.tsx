import { useEffect, useRef, useState } from "react";
import { Book } from "../../../Types/books.types";
import { User } from "../../../Types/users.types";
import ChatMessage from "../../../components/Chat/ChatMessage/ChatMessage";
import classes from "./ChatSection.module.css";
import CustomAvatar from "../../../components/UI/CustomAvatar/CustomAvatar";
import { TextField } from "@mui/material";
import { Message } from "../../../Types/conversations.types";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BeatLoader from "react-spinners/BeatLoader"; // Import BeatLoader
import {
  useGetBookConversationQuery,
  useSendMessageMutation,
} from "../../../redux/services/conversationApiSlice";
import { showAlert } from "../../../redux/features/alerts/alertsSlice";
import { useAppDispatch } from "../../../redux/hooks";

interface ChatSectionProps {
  book: Book;
  user: User;
}

interface messageFieldForm {
  message: string;
}

const ChatSection = ({ book, user }: ChatSectionProps) => {
  const dispatch = useAppDispatch();
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [disableSending, setDisableSending] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  const { data: conversation } = useGetBookConversationQuery({
    userId: user.id,
    bookId: book.id,
  });
  useEffect(() => {
    if (conversation) setMessages(conversation.messages);
  }, [conversation]);

  const form = useForm<messageFieldForm>({
    defaultValues: {
      message: "",
    },
  });

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    messagesContainer.current?.scrollTo({
      top: messagesContainer.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const { handleSubmit, register } = form;

  const onSubmit = async ({ message }: messageFieldForm) => {
    setDisableSending(true);
    if (message) {
      const newMessage: Message = {
        id: 0,
        content: message,
        createdOn: new Date().toISOString(),
        role: "human",
      };
      setMessages((prev) => [...prev, newMessage]);

      setMessageLoading(true);
      const { data, error } = await sendMessage({
        bookId: book.id,
        userId: user.id,
        question: message,
      });
      setMessageLoading(false);

      if (data && !error) {
        form.reset();
        const newRespond: Message = {
          content: data.answer,
          createdOn: new Date().toISOString(),
          id: 0,
          role: "ai",
        };
        setMessages((prev) => [...prev, newRespond]);
      }

      if (error) {
        dispatch(
          showAlert({
            message: "Failed to send message",
            severity: "error",
          })
        );

        setMessages((prev) => prev.slice(0, -1));
      }
    }
    setDisableSending(false);
  };

  return (
    <section id="chat" className={classes.Chat}>
      <h1>Chat with {book.title}</h1>
      <main>
        <div className={classes.messagesContainer} ref={messagesContainer}>
          <ChatMessage
            message={
              <p>
                Hello! I'm your AI assistant, here to help you explore and
                understand this book. Feel free to ask me any questions or dive
                deeper into its content.
              </p>
            }
            fromAi={true}
          />
          {messages.map((message, _idx) => (
            <ChatMessage
              key={_idx}
              message={<p>{message.content}</p>}
              fromAi={message.role === "ai"}
            />
          ))}
          {messageLoading && (
            <ChatMessage
              message={
                <div className={classes.spinnerContainer}>
                  <BeatLoader color="var(--primary-color)" />
                </div>
              }
              fromAi={true}
            />
          )}
        </div>
        <div className={classes.MessageField}>
          <CustomAvatar user={user} />
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              disabled={disableSending}
              sx={{
                width: "100%",
                backgroundColor: "white",
                border: "var(--gray-color)",
              }}
              InputProps={{
                endAdornment: (
                  <button
                    className={classes.Send}
                    type="submit"
                    disabled={disableSending}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                ),
                style: { borderRadius: "var(--large-border-radius)" },
              }}
              {...register("message")}
            />
          </form>
        </div>{" "}
      </main>
    </section>
  );
};

export default ChatSection;
