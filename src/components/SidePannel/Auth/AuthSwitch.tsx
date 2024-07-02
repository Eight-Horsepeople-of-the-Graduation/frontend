import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import classes from "./Auth.module.css";
import Logo from "../../../assets/images/Logo.svg";

const AuthSwitch = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={classes.Auth}>
      <img src={Logo} alt="Readify Logo" width={150} />
      {isLogin ? (
        <div className={classes.LoginContainer}>
          <h2>Log in</h2>
          <p>
            Log in to start reading and chatting with a diverse library of books
          </p>
          <LoginForm />
          <p className={classes.SwitchParagraph}>
            Don't have an account?{" "}
            <a onClick={switchAuthModeHandler}>Sign Up</a>
          </p>
        </div>
      ) : (
        <div className={classes.SignupContainer}>
          <h2>Sign up</h2>
          <p>
            Create an account to start reading and chatting with a diverse
            library of books
          </p>
          <SignupForm />
          <p className={classes.SwitchParagraph}>
            Already have an account?{" "}
            <a onClick={switchAuthModeHandler}>Log in</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthSwitch;
