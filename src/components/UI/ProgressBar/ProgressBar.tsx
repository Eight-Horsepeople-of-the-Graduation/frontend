import * as React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 20,
  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e8eaff",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary,
  },
}));
interface ProgressBarProps {
  progress: number;
}
export default function ProgressBar({ progress }: ProgressBarProps) {
  return <BorderLinearProgress variant="determinate" value={progress} />;
}
