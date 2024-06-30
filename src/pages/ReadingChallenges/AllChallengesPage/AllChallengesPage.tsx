import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import classes from "./AllChallengesPage.module.css";
import { dummyChallenges } from "../../../dummyData";
import BookComponent from "../../../components/BookComponent/BookComponent";
import { Challenge } from "../../../Types/readingChallenges.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCalendarDays, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@mui/material";

function countBooks(challenge: Challenge[]) {
  return challenge.length;
}

const NumOfChallenges = countBooks(dummyChallenges);

const AllChallengesPage = () => {
  document.title = `Readify | Challenges`;
  return (
    <SidePannelLayout>
      <div>
        <div className={classes.Header}>
          <h1 className={classes.Title}>Your Challenges</h1>
          <p>You participated in {NumOfChallenges} challenges.</p>
        </div>
        <div>
          {dummyChallenges.map((challenge) => (
            <div key={challenge.id} className={classes.Container}>
              <Card className={classes.Info}>
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
              </Card>

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
