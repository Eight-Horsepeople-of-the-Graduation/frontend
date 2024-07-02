import classes from "./SidePannel.module.css";
import CustomAvatar from "../UI/CustomAvatar/CustomAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBook,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import ReadingChallenge from "./ReadingChallenges/ReadingChallenge/ReadingChallenge";
import { dummyLists } from "../../dummyData";
import { openCreateListModal } from "../../redux/features/modals/modalsSlice";
import AuthSwitch from "./Auth/AuthSwitch";

interface SidePannelProps {
  isHiden?: boolean;
}

const navItems = [
  { icon: faBookOpen, text: "Currently reading", link: "/lists/current" },
  { icon: faBook, text: "Want to read", link: "/lists/to-read" },
  { icon: faCircleCheck, text: "Done reading", link: "/lists/done" },
];

const SidePannel = ({ isHiden }: SidePannelProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authUser.user);

  const lists = dummyLists; //todo: fetch user lists

  return (
    <aside className={[classes.SidePannel, isHiden && classes.Hiden].join(" ")}>
      {!user ? (
        <AuthSwitch />
      ) : (
        <>
          <div className={classes.user}>
            <div>
              <CustomAvatar user={user} size="m" />
            </div>
            <div className={classes.info}>
              <h2>{user.name}</h2>
              <Link to={`/profile/${user.username}`} title="Go to profile">
                @{user.username}
              </Link>
            </div>
          </div>

          <ReadingChallenge />

          <nav className={classes.Navigator}>
            <ul>
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <a href={item.link}>
                    <FontAwesomeIcon icon={item.icon} />
                    <p>{item.text}</p>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={classes.myLists}>
            <div className={classes.myListsTop}>
              <p>My Lists</p>
              <button onClick={() => dispatch(openCreateListModal())}>+</button>
            </div>
            <hr />
            <ul className={classes.lists}>
              {lists.map((list) => (
                <li key={list.id}>
                  <Link to={`/lists/${list.id}`}>{list.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </aside>
  );
};

export default SidePannel;
