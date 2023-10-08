const {google}=require('googleapis')
const User = require('../../models/User');
const GOOGLE_CLIENT_ID='731653363711-er5dn3p05n6ht85hr51kikhkc480gadm.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='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'
const oauth2Client=new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:5173"
)
const getEventList = async (req,res)=>{
    const {refreshToken} = req.body
    oauth2Client.setCredentials({refresh_token:refreshToken})
    const calendar=google.calendar('v3')

    const getResponse = await calendar.events.list({
        auth:oauth2Client,
        calendarId: 'primary', // Replace with the desired calendar ID
      });

      res.status(200).send(getResponse)
}

module.exports = getEventList