const { userAvailabilityModel, weekModel, userModel } = require('../../models');

const updateSlotAvailabilityById = async (req, res) => {
  try {
    const { week_id, user_id, ...newSlotsData } = req.body;
    console.log(req.body, 'req.body');
    const whereClause = { week_id, user_id };
    await userAvailabilityModel.destroy({ where: whereClause });

    const newSlotRecord = await userAvailabilityModel.create({
      week_id,
      user_id,
      ...newSlotsData,
    });

    res
      .status(200)
      .send({ message: 'Slots updated successfully', newSlotRecord });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating user availability' });
  }
};

module.exports = updateSlotAvailabilityById;
