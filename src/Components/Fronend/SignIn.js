import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function SignIn() {
  const [loginEmail, setUserEmail] = useState("");
  const [signOutBtn, setSignOutBtn] = useState([]);
  const [loginPassword, setUserPassword] = useState("");
  const [success, getSuccess] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setSignOutBtn(
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
    getSuccess("");
  };

  const signInUser = async () => {
    if (loginEmail === "" || loginPassword === "") {
      alert("Kindly fill out the required fields");
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      getSuccess(
        <button className="form-control btn btn-success pe-none">
          Welcome, You are logged In
        </button>
      );
      setSignOutBtn(
        <button className="form-control btn btn-primary mt-3">
          <img
            src="https://img.icons8.com/external-sbts2018-blue-sbts2018/25/000000/external-logout-social-media-basic-1-sbts2018-blue-sbts2018.png"
            alt="Log Out"
            onClick={logOut}
          />
        </button>
      );
    } catch (error) {
      getSuccess(
        <button className="form-control btn btn-danger pe-none">
          Wrong email or password
        </button>
      );
      setSignOutBtn("");
    }
  };
  return (
    <>
      {success}
      <div className="mb-3">
        <label htmlFor="recipient-name" className="col-form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="recipient-name"
          placeholder="Enter your email"
          value={loginEmail}
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
          value={loginPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
      </div>
      <button className="form-control btn btn-primary" onClick={signInUser}>
        Sign In
      </button>
      {signOutBtn}
    </>
  );
}
