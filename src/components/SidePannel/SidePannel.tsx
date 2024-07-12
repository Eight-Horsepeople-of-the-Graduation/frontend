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
import { openCreateListModal } from "../../redux/features/modals/modalsSlice";
import AuthSwitch from "./Auth/AuthSwitch";
import { useGetUserListsQuery } from "../../redux/services/listsApiSlice";
import { List } from "../../Types/lists.types";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/features/users/authSlice";
import { useLogoutMutation } from "../../redux/services/usersApiSlice";

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

  const [sendLogoutRequest] = useLogoutMutation();

  const logoutUser = async () => {
    dispatch(logout());
    await sendLogoutRequest();
  };

  const { data: lists, isSuccess } = useGetUserListsQuery(user?.id ?? 0);

  return (
    <aside className={[classes.SidePannel, isHiden && classes.Hiden].join(" ")}>
      {!user ? (
        <AuthSwitch />
      ) : (
        <>
          <div className={classes.user}>
            <div>
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

            <Button
              title={"Log out"}
              area-label="logout"
              sx={{
                fontSize: "24px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                minWidth: "36px",
              }}
              color="error"
              onClick={logoutUser}
            >
              <LogoutIcon />
            </Button>
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
              {isSuccess &&
                (lists ?? ([] as List[])).map((list) => (
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
