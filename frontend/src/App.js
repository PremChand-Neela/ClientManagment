import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import AddClient from "./components/AddClient";
import ClientList from "./components/ClientList";
import EditClient from "./components/EditClient";

const App = () => {
  return (
    <div className="container">
      <h1>Client Management</h1>

      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
          end
        >
          Client List
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
        >
          Add Client
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<ClientList />} />
        <Route path="/add" element={<AddClient />} />
        <Route path="/edit/:id" element={<EditClient />} />
      </Routes>
    </div>
  );
};

export default App;
