import React from "react";
import Layout from "../../../components/Layout/Layout";
import { Navigate, useParams } from "react-router-dom";
import { useGetReadingChallengeByIdQuery } from "../../../redux/services/readingChallengeApiSlice";

const SingleChallengePage = () => {
  document.title = `Readify | Challenges`;
  const { challengeId } = useParams();

  const { data: ChallengeData } = useGetReadingChallengeByIdQuery(
    challengeId ?? "",
    {
      skip: !challengeId,
    }
  );

  if (!challengeId || !ChallengeData) return <Navigate to="/challenges" />;

  return (
    <Layout>
      <div>
        <h1>Challenge page</h1>
        <h2>{ChallengeData?.type}</h2>
        <h2>{ChallengeData?.goal}</h2>
        <h2>{ChallengeData?.period}</h2>
      </div>
    </Layout>
  );
};

export default SingleChallengePage;
