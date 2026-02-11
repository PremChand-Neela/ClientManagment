import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientById, updateClient } from "../api/clientApi";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
};

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadClient = async () => {
      try {
        // Fetch only the client we want to edit
        const response = await getClientById(id);
        const foundClient = response.data.data;

        setFormData({
          name: foundClient.name,
          email: foundClient.email,
          phone: foundClient.phone,
          company: foundClient.company,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load client");
      } finally {
        setLoading(false);
      }
    };

    loadClient();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateClient(id, formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update client");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="status-text">Loading client...</p>;
  }

  return (
    <div className="card">
      <h2>Edit Client</h2>

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

        <button type="submit" disabled={saving}>
          {saving ? "Updating..." : "Update Client"}
        </button>
      </form>
    </div>
  );
};

export default EditClient;
