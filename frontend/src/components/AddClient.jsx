import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClient } from "../api/clientApi";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
};

const AddClient = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Update specific form field on each input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addClient(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to add client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Client</h2>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Client"}
        </button>
      </form>
    </div>
  );
};

export default AddClient;
