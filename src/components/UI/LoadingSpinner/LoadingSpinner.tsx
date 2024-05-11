import { useAppSelector } from "../../../redux/hooks";
import classes from "./LoadingSpinner.module.css";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  const isLoading = useAppSelector((state) => state.modals.isLoading);

  if (!isLoading) return null;
  return (
    <section className={classes.fade}>
      <CircularProgress color="primary" />
    </section>
  );
};

export default LoadingSpinner;
