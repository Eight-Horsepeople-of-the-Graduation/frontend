import { Navigate, useNavigate, useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import CustomAvatar from "../../components/UI/CustomAvatar/CustomAvatar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Header from "../../components/Header/Header";
import { dummyChallenges } from "../../dummyData";
import ReadingChallengeCard from "../../components/SidePannel/ReadingChallenges/ReadingChallengeCard/ReadingChallengeCard";
import { openCreateChallengeModal } from "../../redux/features/modals/modalsSlice";

const ProfilePage = () => {
  const { username } = useParams();

  const navigate = useNavigate();
  const dispath = useAppDispatch();

  document.title = `Readify | ${username}`;

  const user = useAppSelector((state) => state.authUser.user);

  const challenges = dummyChallenges;
  const activeChallenges = challenges.filter(
    (challenge) => new Date(challenge.endDate) > new Date()
  );

  if (!user) return <Navigate to="/" />;

  return (
    <>
      <Header />
      <div className={classes.ProfilePage}>
        <main>
          <div className={classes.ProfileHeader}>
            <div className={classes.ProfileInfo}>
              <CustomAvatar
                user={user}
                size="l"
                style={{
                  boxShadow: "var(--shadow-near)",
                }}
              />
              <div className={classes.Info}>
                <h1>{user.name}</h1>
                <p>@{user.username}</p>
              </div>
            </div>
          </div>
        </main>
        <aside>
          <div className={classes.Challenges}>
            <div className={classes.ChallengesHeader}>
              <h2>My Challenges</h2>
              <button
                disabled={activeChallenges.length >= 3}
                title="Create new challenge"
                onClick={() => dispath(openCreateChallengeModal())}
              >
                +
              </button>
            </div>
            <div className={classes.ChallengesList}>
              {challenges.map((challenge) => (
                <ReadingChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  selected={false}
                  onClickAction={() => navigate(`/challenges/${challenge.id}`)}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default ProfilePage;
