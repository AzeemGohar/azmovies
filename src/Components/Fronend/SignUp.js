import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";

export default function SignUp() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [success, getSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [signOutBtn, setSignOutBtn] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUsers(
          <button className="form-control btn btn-primary mt-3">
            <img
              src="https://img.icons8.com/external-sbts2018-blue-sbts2018/25/000000/external-logout-social-media-basic-1-sbts2018-blue-sbts2018.png"
              alt="Log Out"
              onClick={logOut}
            />
          </button>
        );
      } else {
        // User is signed out
        // ...
        return;
      }
    });
  }, []);
  const logOut = async () => {
    await signOut(auth);
    setSignOutBtn(
      <button className="form-control btn btn-dark pe-none mt-2">
        You have been logged out
      </button>
    );
    setUsers("");
  };

  const registerUser = async (e) => {
    if (userEmail === "" || userPassword === "" || userName === "") {
      alert("Kindly fill out the required fields");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      getSuccess(
        <button className="form-control btn btn-success pe-none">
          User Registered
        </button>
      );
    } catch (error) {
      return getSuccess(
        <button className="form-control btn btn-danger pe-none">
          Email already registered
        </button>
      );
    }
  };
  return (
    <div>
      {signOutBtn}
      <div className="mb-3">{success}</div>
      <div className="mb-3">
        <label htmlFor="recipient-name" className="col-form-label">
          Username:
        </label>
        <input
          type="text"
          className="form-control"
          id="recipient-name"
          value={userName}
          placeholder="Enter your Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="recipient-name" className="col-form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="recipient-email"
          placeholder="Enter your Email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message-text" className="col-form-label">
          Password
        </label>
        <input
          className="form-control"
          id="message-text"
          type="password"
          placeholder="Enter your password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
      </div>
      <button
        className="form-control btn btn-primary"
        id="liveToastBtn"
        onClick={registerUser}
      >
        Sign Up
      </button>
      {users}
    </div>
  );
}
