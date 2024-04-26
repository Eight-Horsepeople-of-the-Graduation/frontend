import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const ProfilePage = () => {
  const { username } = useParams();

  document.title = `Readify | ${username}`;
  return (
    <Layout>
      <div>
        <h1>Profile Page</h1>
        <p>User: {username}</p>
      </div>
    </Layout>
  );
};

export default ProfilePage;
