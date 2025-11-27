import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";

function Home() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5000/EventCategory");
      setData(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await axios.delete(`http://localhost:5000/EventCategory/${selected.id}`);
      toast.success("Category deleted");
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
          <h2 className="page-title">Event Categories</h2>
          <NavLink className="btn-primary-custom" to="/event-category">
            Add Category
          </NavLink>
        </div>

        <table className="table-clean mt-3">
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Event Type</th>
              <th style={{ width: 120 }}>Status</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length ? (
              data.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>{c.Event_Type}</td>
                  <td>{c.status}</td>
                  <td>
                    <NavLink to={`/event-category/${c.id}`} className="btn-edit me-2">
                      Edit
                    </NavLink>
                    <button className="btn-delete" onClick={() => setSelected(c)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <DeleteModal
          show={!!selected}
          onClose={() => setSelected(null)}
          onConfirm={handleDelete}
          title={selected.Event_Type}
        />
      )}
    </div>
  );
}

export default Home;
