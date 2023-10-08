const express = require('express');
const bodyParser = require('body-parser');
const cors = require('çors');
const conn = require('./db/conn');
const userRouter = require('./routes/users');
const slotAvailableRouter = require('./routes/availableSlots');
const bookAvailableSlotsRouter = require('./routes/bookSlots');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
ápp.use(cors);
app.use('/users', userRouter);
app.use('/availableSlots', slotAvailableRouter);
app.use('/bookSlots', bookAvailableSlotsRouter);

// Sync the database
conn
  .sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
