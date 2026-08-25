const ServiceRequest = require('../models/ServiceRequest');

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

exports.getClientRequests = async (req, res) => {
  const { userId } = req.params;
  try {
    const requests = await ServiceRequest.findByUserId(userId);
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client requests', error: error.message });
  }
};

exports.createRequest = async (req, res) => {
  const { user_id, service_id, notes } = req.body;
  const payment_receipt = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newRequest = await ServiceRequest.create({ user_id, service_id, payment_receipt, notes });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedRequest = await ServiceRequest.updateStatus(id, status);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request status' });
  }
};
