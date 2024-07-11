import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

interface ProgressBarProps {
  progress: number;
  color?: string;
}
export default function ProgressBar({ progress, color }: ProgressBarProps) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 20,
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "var(--gray-color)",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: color ?? theme.palette.primary,
    },
  }));

  return <BorderLinearProgress variant="determinate" value={progress} />;
}
