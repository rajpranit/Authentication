import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router";

import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;

    const sendRequest = async () => {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAMaTNV-mp1A_oBs48elzpQAJtqDfVFeOs",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(res.json);
      }

      console.log("password changed");
    };

    try {
      sendRequest();
      history.replace("/");
    } catch (error) {
      console.log(error.error.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={passwordInputRef} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
