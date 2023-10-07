const { userAvailabilityModel, weekModel, userModel } = require('../../models');

const getAllSlotAvailabilities = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userAvailabilities = await userAvailabilityModel.findAll({
      where: { user_id: userId }, // Use the userId as the search criterion
      include: [{ model: weekModel }, { model: userModel }],
    });

    console.log(userAvailabilities, 'userAvailabilities');

    if (userAvailabilities.length > 0) {
      res.json(userAvailabilities);
    } else {
      res.status(404).json({ error: 'User availabilities not found' });
    }
  } catch (error) {
    console.error('Error fetching user availabilities:', error);
    res.status(500).json({ error: 'Error fetching user availabilities' });
  }
};

module.exports = getAllSlotAvailabilities;
