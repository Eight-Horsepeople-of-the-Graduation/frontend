import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./AllChallengesPage.module.css";
import AddIcon from "@mui/icons-material/Add";
import CreateReadingChallengeModal from "../../../components/Modals/CreateReadingChallengeModal/CreateReadingChallengeModal";
import { openCreateChallengeModal } from "../../../redux/features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ChallengeComponent from "../../../components/ChallengeComponent/ChallengeComponent";
import { IconButton } from "@mui/material";
import { formatISODateToDDMMYYYY } from '../../../helperFuctions/formatISODateToDDMMYYYY';
import { useGetUserReadingChallengesQuery } from "../../../redux/services/readingChallengeApiSlice";

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
    <SidePannelLayout>
      <main style={{width: "100%"}}>
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
              <CreateReadingChallengeModal />
            </IconButton>
          </div>
          <p>You participated in {userChallenges?.length ?? 0} challenges.</p>
          {/* <p>You participated in {dummyChallenges.length} challenges.</p> */}
        </div>
        {challengeFetched && (
          <div>
            {[...userChallenges].map(
              (challenge) =>
                challenge && (
                  <div key={challenge.id}>
                    <ChallengeComponent
                      key={challenge.id}
                      challenge={challenge}
                      formatISODateToDDMMYYYY={formatISODateToDDMMYYYY}
                    />
                  </div>
                )
            )}
          </div>
        )}
        </main>
    </SidePannelLayout>
  );
};

export default AllChallengesPage;
