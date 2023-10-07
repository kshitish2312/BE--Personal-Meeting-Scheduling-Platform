const { userAvailabilityModel } = require('../../models');

const createSlotAvailability = async (req, res) => {
  const availabilityData = req.body;
  const userAvailability = await userAvailabilityModel
    .bulkCreate(availabilityData)
    .then((createdAvailability) => {
      console.log(
        `Created ${createdAvailability.length} availability records.`
      );
    })
    .catch((error) => {
      console.error('Error creating availability records:', error);
    });

  res.status(201).json({ userAvailability });
};

module.exports = createSlotAvailability;
