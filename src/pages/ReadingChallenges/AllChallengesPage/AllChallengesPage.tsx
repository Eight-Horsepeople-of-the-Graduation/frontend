import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./AllChallengesPage.module.css";
import { dummyChallenges } from "../../../dummyData";
import BookComponent from "../../../components/BookComponent/BookComponent";
import { Challenge } from "../../../Types/readingChallenges.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faCalendarDays,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateReadingChallengeModal from "../../../components/Modals/CreateReadingChallengeModal/CreateReadingChallengeModal";
import { openCreateChallengeModal } from "../../../redux/features/modals/modalsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "../../../redux/hooks";

function countBooks(challenge: Challenge[]) {
  return challenge.length;
}

const NumOfChallenges = countBooks(dummyChallenges);

const AllChallengesPage = () => {
  document.title = `Readify | Challenges`;
const dispatch = useAppDispatch();

const handleOpenModal = () => {
  dispatch(openCreateChallengeModal());
};

  return (
    <SidePannelLayout>
      <div>
        <div className={classes.Header}>
          <div className={classes.Title}>
            <p>Your Challenges</p>
            <IconButton>
              <AddIcon
                onClick={handleOpenModal}
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

          <p>You participated in {NumOfChallenges} challenges.</p>
        </div>
        <div>
          {dummyChallenges.map((challenge) => (
            <div key={challenge.id} className={classes.Container}>

              <div className={classes.ListHeader}>
                <h1
                  className={classes.ListTitle}
                  // ref={titleRef}
                >
                  {challenge.type}
                </h1>
                <div className={classes.Controllers}>
              
                {/* <Button
                    title={isEditingName ? "Save" : "Edit list name"}
                    aria-label="edit"
                    sx={{
                      fontSize: "24px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      minWidth: "36px",
                    }}
                    color="primary"
                    onClick={isEditingName ? finishEditName : startEditName}
                  >
                    {isEditingName ? <CheckIcon /> : <EditIcon />}
                  </Button> */}
                  <EditIcon/>
                  <DeleteIcon/>
                </div>
              </div>

              <div className={classes.Info}>
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <p>{challenge.period}</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBullseye} />
                  <p>{challenge.goal} Books</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHourglassEnd} />
                  <p>{challenge.endDate}</p>
                </div>
              </div>

              <div className={classes.List}>
                {challenge.books.map((book) => (
                  <BookComponent key={book.id} book={book} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidePannelLayout>
  );
};

export default AllChallengesPage;
