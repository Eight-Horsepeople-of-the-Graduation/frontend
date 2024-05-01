import { Alert, AlertTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { clearAlert } from "../../../redux/features/alerts/alertsSlice";
import convertFirstLetterToUppercase from "../../../helperFuctions/convertFirstLetterToUppercase";

const CustomAlert = () => {
  const dispatch = useAppDispatch();
  const { message, severity, open } = useAppSelector((state) => state.alert);

  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [open, dispatch]);

  if (!open) return <></>;

  return (
    <Alert
      onClick={() => dispatch(clearAlert())}
      sx={{
        zIndex: 10,
        backgroundColor: `var(--${severity}-color)`,
        color: `var(--dark-${severity}-color)`,
        maxWidth: "384px",
        minWidth: "256px",
        minHeight: "48px",
        borderRadius: "var(--large-border-radius)",
        position: "fixed",
        bottom: 32,
        left: 48,
        display: "flex",
        alignItems: "center",
        boxShadow: "var(--shadow-near)",
        "& *": { marginBottom: 0 },
        "& svg": { color: `var(--dark-${severity}-color)` },
        "& label": { color: "red" },
      }}
      severity={severity}
    >
      <AlertTitle sx={{ fontWeight: "bold" }}>
        {convertFirstLetterToUppercase(severity)}
        {message !== "" ? `: ${message}` : ""}
      </AlertTitle>
    </Alert>
  );
};

export default CustomAlert;
