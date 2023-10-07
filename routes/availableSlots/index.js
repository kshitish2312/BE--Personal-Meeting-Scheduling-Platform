const express = require('express');
const slotAvailableRouter = express.Router();
const {
  createAvailableSlot,
  updateAvailableSlot,
  getAllAvailableSlots,
  deleteAvailableSlot,
  getAvailableSlot,
} = require('./../../controllers/slotAvailabitlity');

slotAvailableRouter.get('/:id', getAvailableSlot);
slotAvailableRouter.get('/allslots/:id', getAllAvailableSlots);
slotAvailableRouter.post('/', createAvailableSlot);
slotAvailableRouter.put('/:id', updateAvailableSlot);
slotAvailableRouter.delete('/:id', deleteAvailableSlot);

module.exports = slotAvailableRouter;
