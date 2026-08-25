const Setting = require('../models/Setting');

exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching settings' });
  }
};

exports.createSetting = async (req, res) => {
  const { key, value, description } = req.body;
  try {
    const newSetting = await Setting.create({ key, value, description });
    res.status(201).json(newSetting);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating setting', error: error.message });
  }
};

exports.updateSetting = async (req, res) => {
  const { id } = req.params;
  const { key, value, description } = req.body;
  try {
    const updatedSetting = await Setting.update(id, { key, value, description });
    if (!updatedSetting) return res.status(404).json({ message: 'Setting not found' });
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating setting' });
  }
};

exports.deleteSetting = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSetting = await Setting.delete(id);
    if (!deletedSetting) return res.status(404).json({ message: 'Setting not found' });
    res.status(200).json({ message: 'Setting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting setting' });
  }
};
