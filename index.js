const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./db/conn');
const userRouter = require('./routes/users');
const slotAvailableRouter = require('./routes/availableSlots');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/availableSlots', slotAvailableRouter);

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
