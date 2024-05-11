import { Navigate, useNavigate, useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import CustomAvatar from "../../components/UI/CustomAvatar/CustomAvatar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Header from "../../components/Header/Header";
import { dummyChallenges, dummyLists } from "../../dummyData";
import ReadingChallengeCard from "../../components/SidePannel/ReadingChallenges/ReadingChallengeCard/ReadingChallengeCard";
import { openCreateChallengeModal } from "../../redux/features/modals/modalsSlice";
import ListPreview from "../../components/UI/ListPreview/ListPreview";

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

  const sortedChallenges = challenges.sort((a, b) => {
    const aDate = new Date(a.endDate);
    const bDate = new Date(b.endDate);
    const aYear = aDate.getFullYear();
    const bYear = bDate.getFullYear();
    const aMonth = aDate.getMonth();
    const bMonth = bDate.getMonth();
    const aDay = aDate.getDate();
    const bDay = bDate.getDate();

    if (aYear < bYear) return 1;
    if (aYear > bYear) return -1;

    if (aMonth < bMonth) return 1;
    if (aMonth > bMonth) return -1;

    if (aDay < bDay) return 1;
    if (aDay > bDay) return -1;

    return 0;
  });

  if (!user) return <Navigate to="/" />;

  const userLists = dummyLists.filter((list) => list.userId === user.id);

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

          <section className={classes.PageContent}>
            {userLists.map(
              (list) =>
                list.books.length && <ListPreview key={list.id} list={list} />
            )}
          </section>
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
              {sortedChallenges.map((challenge) => (
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
