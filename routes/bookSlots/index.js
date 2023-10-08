const express = require('express');
const bookAvailableSlotsRouter = express.Router();
const {
  createSlotBooking,
  deleteSlotBooking,
  getSlotBooking,
  getAllSlotBookings,
  updateSlotBooking,
} = require('./../../controllers/slotsBooking');

bookAvailableSlotsRouter.get('/:id', getSlotBooking);
bookAvailableSlotsRouter.get('/allslots/:id', getAllSlotBookings);
bookAvailableSlotsRouter.post('/', createSlotBooking);
bookAvailableSlotsRouter.put('/:id', updateSlotBooking);
bookAvailableSlotsRouter.delete('/:id', deleteSlotBooking);

module.exports = bookAvailableSlotsRouter;
