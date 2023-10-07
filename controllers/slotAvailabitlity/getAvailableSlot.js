const { userAvailabilityModel, weekModel, userModel } = require('../../models');

const getSlotAvailabilityById = async (req, res) => {
  const id = req.params.id;

  try {
    const userAvailability = await userAvailabilityModel.findByPk(id, {
      include: [{ model: weekModel }, { model: userModel }],
    });
    console.log(userAvailability, 'userAvailability');
    if (userAvailability) {
      res.json(userAvailability);
    } else {
      res.status(404).json({ error: 'User availability not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user availability' });
  }
};

module.exports = getSlotAvailabilityById;
