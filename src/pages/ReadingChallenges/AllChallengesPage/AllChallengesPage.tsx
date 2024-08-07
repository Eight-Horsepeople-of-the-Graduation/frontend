import SidePanelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./AllChallengesPage.module.css";
import AddIcon from "@mui/icons-material/Add";
import { openCreateChallengeModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ChallengeComponent from "../../../components/ChallengeComponent/ChallengeComponent";
import { IconButton } from "@mui/material";
import { formatISODateToDDMMYYYY } from "../../../helperFuctions/formatISODateToDDMMYYYY";
import { useGetUserReadingChallengesQuery } from "../../../redux/services/readingChallengeApiSlice";
import signupVector from "../../../assets/images/singupVector.png"

const AllChallengesPage = () => {
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;

  const { data: userChallenges, isSuccess: challengeFetched } =
    useGetUserReadingChallengesQuery(currentUserId);

  document.title = "Readify | Challenges";
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openCreateChallengeModal());
  };

  return (
    <SidePanelLayout>
      <main style={{ width: "100%" }}>
        {currentUserId === 0 ? (
          <div className={classes.NotAuthMessage}>
            <img
              src={signupVector}
              className={classes.image}
              alt="Signup Vector"
            />
            <p>Please log in or register to view your challenges.</p>
          </div>
        ) : (
          <>
            <div className={classes.Header}>
              <div className={classes.Title}>
                <p>Your Challenges</p>
                <IconButton onClick={handleOpenModal}>
                  <AddIcon
                    sx={{
                      fontSize: "24px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      minWidth: "36px",
                    }}
                    color="primary"
                  />
                </IconButton>
              </div>
              <p>
                You participated in {userChallenges?.length ?? 0} challenges.
              </p>
            </div>
            {challengeFetched && (
              <div>
                {userChallenges.map(
                  (challenge) =>
                    challenge && (
                      <ChallengeComponent
                        key={challenge.id}
                        challenge={challenge}
                        formatISODateToDDMMYYYY={formatISODateToDDMMYYYY}
                      />
                    )
                )}
              </div>
            )}
          </>
        )}
      </main>
    </SidePanelLayout>
  );
};

export default AllChallengesPage;
