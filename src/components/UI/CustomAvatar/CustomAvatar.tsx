import React from "react";
import { Avatar } from "@mui/material";
import classes from "./CustomAvatar.module.css";

interface CustomAvatarProps {
  user: { name: string; username: string; image: string };
  size?: "s" | "m" | "l";
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

const CustomAvatar = ({ user: { name, image }, size }: CustomAvatarProps) => {
  return (
    <Avatar
      {...stringAvatar(name)}
      sx={{ width: avatarSizes[size ?? "m"], height: avatarSizes[size ?? "m"] }}
      className={classes.avatar}
      alt={name}
      src={image}
    />
  );
};

export default CustomAvatar;
