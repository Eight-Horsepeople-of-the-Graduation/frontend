import { useState } from "react";
import { User } from "../../Types/users.types";
//import { useAppSelector } from "../../redux/hooks";
import CustomAvatar from "../UI/CustomAvatar/CustomAvatar";
import classes from "./Review.module.css";

interface ReviewProps {
  user: User;
  rating: number;
  date: string;
  text: string;
  showMore?: boolean; // Optional prop for controlling text visibility
}
const Review: React.FC<ReviewProps> = ({
  user,
  rating,
  date,
  text,
  showMore = false,
}) => {
  //const user = useAppSelector((state) => state.authUser.user);

  const [isExpanded, setIsExpanded] = useState(showMore);
  const stars = Array(rating).fill(0);
  const toggleTextVisibility = () => setIsExpanded(!isExpanded);

  const reviewText = isExpanded ? text : text.slice(0, 100) + "..."; // Truncate text if not expanded

  if (!user) return <></>;

  return (
    <div className={classes.review}>
      <div className={classes.reviewHeader}>
        <div className={classes.user}>
          <div>
            <CustomAvatar user={user} size="m" />
          </div>
          <div className={classes.info}>
            <span className={classes.reviewName}>{user.name}</span>
          </div>
          <div className={classes.reviewRating}>
            {stars.map((_, index) => (
              <span key={index} className={classes.reviewStar}>
                ★
              </span>
            ))}
          </div>
        </div>
        <span className={classes.reviewDate}>{date}</span>
      </div>
      <div className={classes.reviewText}>{reviewText}</div>
      {text.length > 100 && (
        <button className="reviewShowMore" onClick={toggleTextVisibility}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Review;
