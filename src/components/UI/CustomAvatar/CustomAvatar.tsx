import { Avatar, SxProps, Theme } from "@mui/material";
import classes from "./CustomAvatar.module.css";
import { User } from "../../../Types/users.types";

interface CustomAvatarProps {
  user: User;
  size?: "s" | "m" | "l";
  style?: SxProps<Theme>;
}

const avatarSizes = {
  s: "16px",
  m: "48px",
  l: "192px",
};

function stringToColor(string: string): string {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  if (!name) return { sx: { bgcolor: "#000" }, children: "U" };
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

const CustomAvatar = ({ user, size = "m", style }: CustomAvatarProps) => {
  const avatarProps = stringAvatar(user.name ?? user.username);

  return (
    <Avatar
      {...avatarProps}
      sx={{
        width: avatarSizes[size],
        height: avatarSizes[size],
        ...style,
      }}
      className={classes.avatar}
      alt={user.name}
      src={user.profilePicture}
    />
  );
};

export default CustomAvatar;
