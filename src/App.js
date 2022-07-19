import "./App.css";

import Navbar from "./Components/Fronend/Navbar";
import { Routes, Route } from "react-router-dom";
import Carousel from "./Components/Fronend/Carousel";
import React from "react";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Posting from "./Components/Admin/Posting";
import ViewUpdate from "./Components/Admin/ViewUpdate";
import Orders from "./Components/Admin/Orders";
import Admin from "./Components/Fronend/Admin";

function App() {
  return (
    // <Posting />
    // <Rendering />

    // OffCanvas
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Carousel />}></Route>
        <Route path="/SignUp" element={<Carousel />} />
        <Route path="/SignIn" element={<Carousel />} />
        <Route path="/Admin" element={<Carousel />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminDashboard/Posting" element={<Posting />} />
        <Route path="/AdminDashboard/ViewUpdate" element={<ViewUpdate />} />
        <Route path="/AdminDashboard/Orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
export default App;
