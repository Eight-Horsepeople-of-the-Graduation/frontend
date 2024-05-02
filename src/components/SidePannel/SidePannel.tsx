import classes from "./SidePannel.module.css";
import CustomAvatar from "../UI/CustomAvatar/CustomAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBook,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import ReadingChallenge from "./ReadingChallenges/ReadingChallenge/ReadingChallenge";
import CreateListModal from "../Modals/CreateListModal/CreateListModal";
import { useState } from "react";
import { dummyLists } from "../../dummyData";

const SidePannel = () => {
  const user = useAppSelector((state) => state.authUser.user);
  const [isCreatingList, setIsCreatingList] = useState(false);

  if (!user) return <></>;

  const navItems = [
    { icon: faBookOpen, text: "Currently reading", link: "/lists/current" },
    { icon: faBook, text: "Want to read", link: "/lists/to-read" },
    { icon: faCircleCheck, text: "Done reading", link: "/lists/done" },
  ];

  const lists = dummyLists;

  return (
    <>
      <CreateListModal
        isCreatingList={isCreatingList}
        closeCreateListModal={() => setIsCreatingList(false)}
      />
      <aside className={classes.SidePannel}>
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
            <button onClick={() => setIsCreatingList(true)}>+</button>
          </div>
          <hr />
          <ul className={classes.lists}>
            {lists.map((list) => (
              <li key={list.id}>
                <Link to={`/lists/${list.id}`}>{list.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SidePannel;
