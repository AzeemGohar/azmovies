import React from "react";
import { useState } from "react";
// import Posting from "../Admin/Posting";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Admin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [signOutBtn, setSignOutBtn] = useState([]);
  const [success, getSuccess] = useState("");
  const [dashboard, setdashboard] = useState("");

  const signInAdmin = async () => {
    if (adminEmail === "" || adminPassword === "") {
      alert("Kindly fill out the required fields");
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        adminEmail,
        adminPassword
      );
      if (adminEmail === "axeem@gmail.com" && adminPassword === "12344321") {
        getSuccess(
          <button className="form-control btn btn-success pe-none">
            Welcome, You are logged In
          </button>
        );
        setdashboard(
          <button className="btn btn-success mt-1">Go To Dashboard</button>
        );
        setSignOutBtn(
          <button
            className="form-control btn btn-primary mt-3"
            onClick={logOut}
          >
            <img
              src="https://img.icons8.com/external-sbts2018-blue-sbts2018/25/000000/external-logout-social-media-basic-1-sbts2018-blue-sbts2018.png"
              alt="Log Out"
            />
          </button>
        );
      } else {
        getSuccess(
          <button className="form-control btn btn-danger pe-none">
            Wrong email or password
          </button>
        );
        setSignOutBtn("");
      }
    } catch (err) {
      return;
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setSignOutBtn(
      <button className="form-control btn btn-dark pe-none mt-2">
        You have been logged out
      </button>
    );
    getSuccess("");
  };

  return (
    <>
      {success}
      <div className="mb-3">
        <label htmlFor="recipient-name" className="col-form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="recipient-name"
          placeholder="Enter your email"
          value={adminEmail}
          onChange={(e) => {
            setAdminEmail(e.target.value);
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
          value={adminPassword}
          onChange={(e) => {
            setAdminPassword(e.target.value);
          }}
        />
      </div>

      <button className="form-control btn btn-primary" onClick={signInAdmin}>
        Sign In
      </button>
      {signOutBtn}

      <Link to="/AdminDashboard" className="mt-2">
        {dashboard}
      </Link>
    </>
  );
}
