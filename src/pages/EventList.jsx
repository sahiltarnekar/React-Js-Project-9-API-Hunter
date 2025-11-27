import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";

function EventList() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const [eRes, cRes] = await Promise.all([
        axios.get("http://localhost:5000/Events"),
        axios.get("http://localhost:5000/EventCategory")
      ]);
      setEvents(eRes.data || []);
      setCategories(cRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getCategoryName = (cid) => {
    const f = categories.find((c) => c.id === cid);
    return f ? f.Event_Type : "-";
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await axios.delete(`http://localhost:5000/Events/${selected.id}`);
      toast.success("Event deleted");
      setSelected(null);
      load();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="page-container">
      <div className="container-box">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="page-title">Event List</h2>
          <NavLink className="btn-primary-custom" to="/add-event">
            Add Event
          </NavLink>
        </div>

        <table className="table-clean mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Organizer</th>
              <th>Contact</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th style={{ width: 150 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length ? (
              events.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.eventName}</td>
                  <td>{ev.organizer}</td>
                  <td>{ev.contact}</td>
                  <td>{ev.venue}</td>
                  <td>{ev.date}</td>
                  <td>{getCategoryName(ev.category)}</td>
                  <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {ev.description}
                  </td>
                  <td>
                    <NavLink to={`/add-event/${ev.id}`} className="btn-edit me-2">
                      Edit
                    </NavLink>
                    <button onClick={() => setSelected(ev)} className="btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <DeleteModal show={!!selected} onClose={() => setSelected(null)} onConfirm={handleDelete} title={selected.eventName} />
      )}
    </div>
  );
}

export default EventList;
