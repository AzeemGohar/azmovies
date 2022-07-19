import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import SignUp from "./SignUp";
import Admin from "./Admin";
import CircleIcon from "@mui/icons-material/Circle";
// import AdminDashboard from "../Admin/AdminDashboard";

export default function Account() {
  const closeModal = () => {};
  const [user, setUser] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(
          <CircleIcon
            className="ms-2"
            style={{ color: "#31ff42", fontSize: "medium" }}
          />
        );
        // ...
      } else {
        // User is signed out
        // ...
        setUser(
          <CircleIcon
            className="ms-2"
            style={{ color: "Red", fontSize: "medium" }}
          />
        );
      }
    });
  }, []);
  return (
    <>
      <button
        className="navbar-toggler display-4 text-light mx-2 my-2 align-self-sm-center"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@getbootstrap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="30"
          fill="currentColor"
          className="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>{" "}
        Account
        {user}
      </button>

      {/* <!-- Vertically centered modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Enter Your Credentials
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <Routes>
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
            <div style={{ margin: "0 auto" }}>
              <hr className="w-100" />
              <Link to="/admin">
                <button type="button" className="btn btn-success ">
                  Admin Login
                </button>
              </Link>
              <Link to="/signUp">
                <button type="button" className="btn btn-primary mx-2">
                  Create Account
                </button>
              </Link>
              <Link to="/signIn">
                <button type="button" className="btn btn-primary ">
                  Log In
                </button>
              </Link>
              <br />
              <hr className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
