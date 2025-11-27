import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EventCategory() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const go = useNavigate();

  const load = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:5000/EventCategory/${id}`);
      reset(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load category");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const save = async (data) => {
    try {
      if (id) {
        await axios.put(`http://localhost:5000/EventCategory/${id}`, data);
        toast.success("Category updated");
      } else {
        // generate simple id if missing
        if (!data.id) data.id = Date.now().toString(16);
        await axios.post("http://localhost:5000/EventCategory", data);
        toast.success("Category added");
      }
      go("/");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  return (
    <div className="page-container">
      <div className="container-box">
        <h2 className="page-title">Event Category</h2>

        <form onSubmit={handleSubmit(save)}>
          <label className="form-label">Event Type</label>
          <input {...register("Event_Type")} className="form-control mb-3" required />

          <label className="form-label">Status</label>
          <select {...register("status")} className="form-select mb-3" defaultValue="Active">
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>

          <div>
            <button type="submit" className="btn-primary-custom">
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventCategory;
