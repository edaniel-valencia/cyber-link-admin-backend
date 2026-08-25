const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching services', error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating service', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedService = await Service.update(id, req.body);
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating service', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await Service.delete(id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting service' });
  }
};
