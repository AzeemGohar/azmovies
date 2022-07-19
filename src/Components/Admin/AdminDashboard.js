import React from "react";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

export default function AdminDashboard() {
  return (
    <div
      className="container bg-light border-light"
      style={{ minHeight: "80vh" }}
    >
      <Link to="/AdminDashboard/Posting">
        <button
          className="fs-3 btn btn-light m-2"
          style={{
            width: "211px",
            height: "139px",

            border: "1px solid #aaaaaa",
          }}
        >
          <AddCircleIcon style={{ fontSize: "39px" }} />
          <br />
          Add Movie
        </button>
      </Link>
      <Link to="/AdminDashboard/ViewUpdate">
        <button
          className="fs-3  btn btn-light m-2"
          style={{
            width: "211px",
            height: "139px",
            verticalAlign: "top",
            color: "#1d1d1d",
            border: "1px solid #aaaaaa",
          }}
        >
          <EditIcon style={{ fontSize: "39px" }} />
          View/Update
        </button>
      </Link>
      <Link to="/AdminDashboard/Orders">
        <button
          className="fs-3 btn btn-light m-2"
          style={{
            width: "211px",
            height: "139px",
            color: "#1d1d1d",
            border: "1px solid #aaaaaa",
          }}
        >
          <VisibilityIcon style={{ fontSize: "39px" }} />
          <br />
          View Orders
        </button>
      </Link>
    </div>
  );
}
