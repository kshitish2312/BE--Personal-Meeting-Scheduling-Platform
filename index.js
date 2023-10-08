const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('./db/conn');
const userRouter = require('./routes/users');
const slotAvailableRouter = require('./routes/availableSlots');
const bookAvailableSlotsRouter = require('./routes/bookSlots');
const {google}=require('googleapis')
const User = require('./models/User');
const calendarSync = require('./controllers/Users/calendarSync');
const app = express();
const router = express.Router()
const port = process.env.PORT || 3011;
require('dotenv').config()

const GOOGLE_CLIENT_ID='731653363711-er5dn3p05n6ht85hr51kikhkc480gadm.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='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'

    const oauth2Client=new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        "http://localhost:5173"
      )

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/availableSlots', slotAvailableRouter);
app.use('/bookSlots', bookAvailableSlotsRouter);
router.post('/tokens',async(req,res)=>{
try{
  // const {code}=req.body
  // const {tokens} = await oauth2Client.getToken(code)
  // oauth2Client.setCredentials(tokens);
  // console.log(code)

  // const updatedUser = await User.update({
  //     refreshToken: tokens.refresh_token,
  //     isActivated: true
      
  // })
  // console.log(updatedUser)
  // res.status(200).send(tokens)
  res.send('Hii')
}catch(error){
  console.log('error',error)
}})
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
