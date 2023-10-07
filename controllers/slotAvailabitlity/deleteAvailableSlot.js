const { userAvailabilityModel, weekModel, userModel } = require('../../models');

const deleteSlotAvailabilityById = async (req, res) => {
  const id = req.params.id;
  try {
    const userAvailability = await userAvailabilityModel.findByPk(id);
    if (userAvailability) {
      await userAvailability.destroy();
      res.json({ message: 'User availability deleted successfully' });
    } else {
      res.status(404).json({ error: 'User availability not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user availability' });
  }
};

module.exports = deleteSlotAvailabilityById;