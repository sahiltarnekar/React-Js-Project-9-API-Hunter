import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddEvent() {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const go = useNavigate();

  const loadCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/EventCategory");
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    }
  };

  const loadEvent = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:5000/Events/${id}`);
      reset(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load event");
    }
  };

  useEffect(() => {
    loadCategories();
    loadEvent();
  }, [id]);

  const save = async (data) => {
    try {
      if (id) {
        await axios.put(`http://localhost:5000/Events/${id}`, data);
        toast.success("Event updated");
      } else {
        if (!data.id) data.id = Date.now().toString(16);
        await axios.post("http://localhost:5000/Events", data);
        toast.success("Event added");
      }
      go("/events");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  return (
    <div className="page-container">
      <div className="container-box">
        <h2 className="page-title mb-3">{id ? "Edit Event" : "Add Event"}</h2>

        <form onSubmit={handleSubmit(save)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Event Name</label>
              <input {...register("eventName")} className="form-control" required />
            </div>

            <div className="col-md-6 mb-3">
              <label>Organizer</label>
              <input {...register("organizer")} className="form-control" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Contact</label>
              <input {...register("contact")} className="form-control" />
            </div>

            <div className="col-md-4 mb-3">
              <label>Venue</label>
              <input {...register("venue")} className="form-control" />
            </div>

            <div className="col-md-4 mb-3">
              <label>Date</label>
              <input type="date" {...register("date")} className="form-control" />
            </div>
          </div>

          <label>Category</label>
          <select {...register("category")} className="form-select mb-3">
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.Event_Type}
              </option>
            ))}
          </select>

          <label>Description</label>
          <textarea {...register("description")} className="form-control mb-3" />

          <button type="submit" className="btn-primary-custom">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
