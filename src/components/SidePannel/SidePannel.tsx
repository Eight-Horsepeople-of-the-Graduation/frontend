import classes from "./SidePannel.module.css";
import CustomAvatar from "../UI/CustomAvatar/CustomAvatar";
import ProgressBar from "../UI/ProgressBar/ProgressBar";

const user = {
  name: "Adham Usama",
  username: "adhamusama25",
  image: "https://avatars.githubusercontent.com/u/56196724?v=4",
};

const SidePannel = () => {
  const progress = 120;
  const total = 240;
  return (
    <aside className={classes.SidePannel}>
      <div className={classes.user}>
        <div>
          <CustomAvatar user={user} size="m" />
        </div>
        <div className={classes.info}>
          <h2>{user.name}</h2>
          <a href={`/profile/${user.username}`}>@{user.username}</a>
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
    </aside>
  );
};

export default SidePannel;
