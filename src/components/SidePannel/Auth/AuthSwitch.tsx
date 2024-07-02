import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthSwitch = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      {isLogin ? (
        <div>
          <h2>Log in</h2>
          <LoginForm />
          <p>
            Don't have an account?{" "}
            <a onClick={switchAuthModeHandler}>Sign Up</a>
          </p>
        </div>
      ) : (
        <div>
          <h2>Sign up</h2>
          <SignupForm />
          <p>
            Already have an account?{" "}
            <a onClick={switchAuthModeHandler}>Log in</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthSwitch;
