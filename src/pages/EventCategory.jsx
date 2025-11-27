import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EventCategory() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const go = useNavigate();

  // -------------------------
  // LOAD DATA IN EDIT MODE
  // -------------------------
  const load = async () => {
    try {
      if (!id) return;
      const res = await axios.get(`http://localhost:5000/EventCategory/${id}`);
      if (res.data) reset(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load category");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  // -------------------------
  // SAVE (Add + Edit)
  // -------------------------
  const save = async (data) => {
    try {
      // trim name
      const newName = data.Event_Type.trim().toLowerCase();

      // load all category
      const res = await axios.get("http://localhost:5000/EventCategory");
      const all = res.data || [];

      // Duplicate check (ignore same id when editing)
      const exists = all.some(
        (item) =>
          item.Event_Type.trim().toLowerCase() === newName &&
          item.id !== id
      );

      if (exists) {
        toast.error("Category already exists!");
        return;
      }

      // If editing
      if (id) {
        await axios.put(`http://localhost:5000/EventCategory/${id}`, data);
        toast.success("Category updated");
      } 
      
      // If adding new
      else {
        data.id = Date.now().toString(16); // simple unique ID
        await axios.post("http://localhost:5000/EventCategory", data);
        toast.success("Category added");
      }

      go("/");

    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="page-container">
      <div className="container-box">
        <h2 className="page-title mb-3">
          {id ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit(save)}>

          <label className="form-label">Event Type</label>
          <input
            {...register("Event_Type", { required: true })}
            className="form-control mb-3"
            placeholder="Enter category name"
          />

          <label className="form-label">Status</label>
          <select
            {...register("status")}
            className="form-select mb-3"
            defaultValue="Active"
          >
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>

          <button className="btn-primary-custom">
            {id ? "Update Category" : "Add Category"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EventCategory;
