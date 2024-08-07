import classes from "./SidePanel.module.css";
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
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/features/users/authSlice";
import { useLogoutMutation } from "../../redux/services/usersApiSlice";
import convertToTitleCase from "../../helperFuctions/capitalizeWords";

interface SidePanelProps {
  isHidden?: boolean;
}

const navItems = [
  { icon: faBook, text: "Want to read", link: "/lists/to-read" },
  { icon: faBookOpen, text: "Currently reading", link: "/lists/current" },
  { icon: faCircleCheck, text: "Done reading", link: "/lists/done" },
];

const SidePanel = ({ isHidden }: SidePanelProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authUser.user);

  const [sendLogoutRequest] = useLogoutMutation();

  const logoutUser = async () => {
    dispatch(logout());
    await sendLogoutRequest();
  };

  const { data: lists, isSuccess } = useGetUserListsQuery(user?.id ?? 0);

  const userLists = lists?.filter(
    (list) =>
      list.title.toLowerCase() !== "want to read" &&
      list.title.toLowerCase() !== "currently reading" &&
      list.title.toLowerCase() !== "done reading"
  );

  return (
    <aside className={[classes.SidePanel, isHidden && classes.Hidden].join(" ")}>
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
                <h2>{convertToTitleCase(user.name)}</h2>
                <Link to={`/profile/${user.username}`} title="Go to profile">
                  @{user.username}
                </Link>
              </div>
            </div>

            <Button
              title={"Log out"}
              area-label="logout"
              sx={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                minWidth: "36px",
              }}
              color="error"
              onClick={logoutUser}
            >
              <LogoutIcon style={{
                fontSize: "1rem",
              }} />
            </Button>
          </div>

          <ReadingChallenge />

          <nav className={classes.Navigator}>
            <ul>
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link}>
                    <FontAwesomeIcon icon={item.icon} />
                    <p>{item.text}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={classes.myLists}>
            <div className={classes.myListsTop}>
              <p>My Lists</p>
              <button onClick={() => dispatch(openCreateListModal())}>+</button>
            </div>
            <ul className={classes.lists}>
              {isSuccess &&
                userLists?.map((list) => (
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

export default SidePanel;
