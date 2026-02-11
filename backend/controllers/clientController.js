const mongoose = require("mongoose");
const Client = require("../models/Client");

// Create a new client
const addClient = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    if (!name || !email || !phone || !company) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Avoid duplicate clients based on email
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(409).json({
        success: false,
        message: "A client with this email already exists",
      });
    }

    const client = await Client.create({ name, email, phone, company });

    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error.message,
    });
  }
};

// Fetch all clients (newest first)
const getClients = async (_req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
      error: error.message,
    });
  }
};

// Fetch one client by ID (used by Edit page)
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID",
      });
    }

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch client",
      error: error.message,
    });
  }
};

// Update an existing client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID",
      });
    }

    if (!name || !email || !phone || !company) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, email, phone, company },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID",
      });
    }

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      data: deletedClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete client",
      error: error.message,
    });
  }
};

module.exports = {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
