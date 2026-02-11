import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteClient, getClients } from "../api/clientApi";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Reusable loader function so list can be refreshed easily
  const fetchClients = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getClients();
      setClients(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this client?");
    if (!isConfirmed) return;

    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((client) => client._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete client");
    }
  };

  if (loading) {
    return <p className="status-text">Loading clients...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="card">
      <h2>Client List</h2>

      {clients.length === 0 ? (
        <p className="status-text">No clients found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.company}</td>
                <td>{new Date(client.createdAt).toLocaleString()}</td>
                <td className="actions-cell">
                  <Link to={`/edit/${client._id}`} className="edit-btn">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => handleDelete(client._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientList;
