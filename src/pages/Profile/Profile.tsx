import { useNavigate, useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import CustomAvatar from "../../components/UI/CustomAvatar/CustomAvatar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Header from "../../components/Header/Header";
import ReadingChallengeCard from "../../components/SidePannel/ReadingChallenges/ReadingChallengeCard/ReadingChallengeCard";
import ListPreview from "../../components/ListPreview/ListPreview";
import { openCreateChallengeModal } from "../../redux/features/modals/modalsSlice";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useGetUserByUsernameQuery } from "../../redux/services/usersApiSlice";
import { Challenge } from "../../Types/readingChallenges.types";
import { useGetUserListsQuery } from "../../redux/services/listsApiSlice";
import { List } from "../../Types/lists.types";
import { useGetUserReadingChallengesQuery } from "../../redux/services/readingChallengeApiSlice";

const ProfilePage = () => {
  const { username } = useParams();

  const navigate = useNavigate();
  const dispath = useAppDispatch();

  if (!username) navigate("/");

  document.title = `Readify | ${username}`;

  const currentUser = useAppSelector((state) => state.authUser.user);

  const { data: user, isSuccess } = useGetUserByUsernameQuery(username!, {
    skip: !username,
  });

  const { data: challenges } = useGetUserReadingChallengesQuery(user?.id ?? 0, {
    skip: !user,
  });

  const myChallenges = challenges ? [...challenges] : [];

  const activeChallenges = myChallenges
    ? myChallenges.filter(
        (challenge) => new Date(challenge.endDate) > new Date()
      )
    : [];

  const sortedChallenges = myChallenges.sort((a, b) => {
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

  const { data: userLists } = useGetUserListsQuery(user?.id ?? 0, {
    skip: !user,
  });

  const isMyProfile = Boolean(currentUser && username === currentUser.username);

  if (isSuccess)
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

              {isMyProfile && (
                <Button
                  title={"Edit Profile"}
                  aria-label="edit-profile"
                  sx={{
                    fontSize: "24px",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    minWidth: "36px",
                  }}
                  color="primary"
                  onClick={() => {
                    navigate("edit");
                  }}
                >
                  {<EditIcon />}
                </Button>
              )}
            </div>

            <section className={classes.PageContent}>
              {(userLists ?? ([] as List[])).map(
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
                {sortedChallenges?.map((challenge: Challenge) => (
                  <ReadingChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    selected={false}
                    onClickAction={() => navigate(`/challenges`)}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </>
    );
  return <></>;
};

export default ProfilePage;
