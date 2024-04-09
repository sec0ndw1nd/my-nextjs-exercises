import { useRef, useState } from 'react';
import classes from './profile-form.module.css';

function ProfileForm({ onChangePassword }) {
  const [errMessage, setErrMessage] = useState();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // validation
    if (
      !enteredOldPassword ||
      !enteredNewPassword ||
      enteredOldPassword.trim() === '' ||
      enteredNewPassword.trim() === ''
    ) {
      setErrMessage('fill inputs.');
      return;
    }
    if (
      enteredNewPassword.trim().length < 8 ||
      enteredNewPassword.trim().length > 20
    ) {
      setErrMessage('Password should be 8-20 characters long.');
      return;
    }

    setErrMessage(null);
    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {errMessage && <p>{errMessage}</p>}
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>

      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
