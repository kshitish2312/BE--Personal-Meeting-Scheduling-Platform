const {
  slotBookingModel,
  weekModel,
  userModel,
  userAvailabilityModel,
} = require('../../models');

const getAllSlotBookingAvailability = async (req, res) => {
  const findReceiverSlot = await findAvailableSlots(1);

  res.status(200).send(findReceiverSlot);
};

async function findAvailableSlots(userId) {
  try {
    const availableSlots = await userAvailabilityModel.findAll({
      where: {
        user_id: userId,
      },
    });
    console.log(availableSlots);
    // Handle the retrieved availableSlots
    return availableSlots;
  } catch (error) {
    // Handle error
    console.error('Error finding available slots:', error);
    throw error;
  }
}

module.exports = getAllSlotBookingAvailability;
