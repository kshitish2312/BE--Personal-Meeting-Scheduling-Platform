const {
  slotBookingModel,
  weekModel,
  userModel,
  userAvailabilityModel,
} = require('../../models');

const { Op } = require('sequelize');

const createSlotBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const {
      receiver_Id,
      start_time: proposedStartTime,
      end_time: proposedEndTime,
    } = req.body;

    const findReceiverSlot = await findAvailableSlots(
      proposedStartTime,
      proposedEndTime,
      receiver_Id
    );

    if (findReceiverSlot) {
      const slotBooking = await slotBookingModel.create(bookingData);
      res.status(201).json(slotBooking);
    }
  } catch (error) {
    console.error('Error creating slot booking:', error);
    res.status(500).json({ error: 'Error creating slot booking' });
  }
};

// Update an existing slot booking
exports.updateSlotBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updatedBookingData = req.body;

    // Find the slot booking record
    const slotBooking = await slotBookingModel.findByPk(bookingId);

    if (!slotBooking) {
      return res.status(404).json({ error: 'Slot booking not found' });
    }

    // Update the slot booking record
    await slotBooking.update(updatedBookingData);

    // Update userAvailabilityModel based on the update (you need to implement this)
    await updateSlotAvailability(updatedBookingData);

    res.json(slotBooking);
  } catch (error) {
    console.error('Error updating slot booking:', error);
    res.status(500).json({ error: 'Error updating slot booking' });
  }
};

async function findAvailableSlots(startTime, endTime, userId) {
  console.log(startTime, 'startTime');
  console.log('endTime', endTime);
  try {
    const availableSlots = await userAvailabilityModel.findAll({
      where: {
        start_time: {
          [Op.gte]: startTime, // Greater than or equal to startDate
        },
        end_time: {
          [Op.lte]: endTime, // Less than or equal to endDate
        },
        user_id: userId,
      },
    });

    // Handle the retrieved availableSlots
    console.log(availableSlots, 'availableSlots');
    return availableSlots;
  } catch (error) {
    // Handle error
    console.error('Error finding available slots:', error);
    throw error;
  }
}

module.exports = { findAvailableSlots };

module.exports = createSlotBooking;
