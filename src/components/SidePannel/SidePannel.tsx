import classes from "./SidePannel.module.css";
import CustomAvatar from "../UI/CustomAvatar/CustomAvatar";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBook,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

const SidePannel = () => {
  const user = useAppSelector((state) => state.authUser.user);

  if (!user) return <></>;

  const progress = 120;
  const total = 240;

  const navItems = [
    { icon: faBookOpen, text: "Currently reading", link: "/lists/current" },
    { icon: faBook, text: "Want to read", link: "/lists/to-read" },
    { icon: faCircleCheck, text: "Done reading", link: "/lists/done" },
  ];

  const lists = [
    { id: 1, name: "Novels" },
    { id: 2, name: "Self Development Books" },
    { id: 3, name: "Programming Books" },
    { id: 4, name: "Business Books" },
    { id: 5, name: "History Books" },
    { id: 6, name: "Biography Books" },
    { id: 7, name: "Science Books" },
    { id: 8, name: "Fantasy Books" },
  ];

  return (
    <aside className={classes.SidePannel}>
      <div className={classes.user}>
        <div>
          <CustomAvatar user={user} size="m" />
        </div>
        <div className={classes.info}>
          <h2>{user.name}</h2>
          <Link to={`/profile/${user.username}`}>@{user.username}</Link>
        </div>
      </div>

      <div className={classes.progressInfo}>
        <p>My progress</p>
        <p>
          {progress}/{total}
        </p>
      </div>
      <div className={classes.progress}>
        <ProgressBar progress={(progress / total) * 100} />
      </div>

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
          <button onClick={() => null}>+</button>
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
  );
};

export default SidePannel;
