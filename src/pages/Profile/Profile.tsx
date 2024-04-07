import React from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();

  document.title = `Readify | ${username}`;
  return (
    <div>
      <h1>Profile Page</h1>
      <p>User: {username}</p>
    </div>
  );
};

export default ProfilePage;
