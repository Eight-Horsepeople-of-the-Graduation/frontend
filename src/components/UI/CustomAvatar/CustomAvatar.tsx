import React from "react";
import { Avatar, SxProps, Theme } from "@mui/material";
import classes from "./CustomAvatar.module.css";
import { User } from "../../../Types/userTypes";

interface CustomAvatarProps {
  user: User;
  size?: "s" | "m" | "l";
  style?: SxProps<Theme>;
}

const avatarSizes = {
  s: "16px",
  m: "64px",
  l: "192px",
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const CustomAvatar = ({ user, size, style }: CustomAvatarProps) => {
  return (
    <Avatar
      {...stringAvatar(user.name)}
      sx={{
        width: avatarSizes[size ?? "m"],
        height: avatarSizes[size ?? "m"],
        ...style,
      }}
      className={classes.avatar}
      alt={user.name}
      src={user.image}
    />
  );
};

export default CustomAvatar;
