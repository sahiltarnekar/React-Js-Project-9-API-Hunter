import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Event Manager</h3>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className="sidebar-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/event-category" className="sidebar-link">
            Event Category
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-event" className="sidebar-link">
            Add Event
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className="sidebar-link">
            Event List
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
