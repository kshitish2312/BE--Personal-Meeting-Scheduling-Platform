const User = require('./../../models/User');
const dotenv=require('dotenv')
const {google}=require('googleapis')

dotenv.config()


const GOOGLE_CLIENT_ID='731653363711-er5dn3p05n6ht85hr51kikhkc480gadm.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='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'
const oauth2Client=new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:5173"
)

const calendarSync = async(req,res)=>{    
    console.log(req.body, "req.body")
try{
    const {code,id}=req.body
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    console.log(code)
    const updateUser = await User.update(
        {
          refreshToken: tokens.refresh_token,
          isActivated: true
        },
        {
          where: {
             id // Use the userIdToUpdate as the condition
          }
        }
      );

    console.log(updateUser, "updateUser")
    res.status(200).send(tokens)

}catch(error){
        console.log('error',error)
      }

}

const getEventList = async (req,res)=>{
    try{
    const {refreshToken} = req.body

    console.log(refreshToken, "refreshToken")
    oauth2Client.setCredentials({refresh_token:refreshToken})
    const calendar=google.calendar('v3')

    const getResponse = await calendar.events.list({
        auth:oauth2Client,
        calendarId: 'primary', // Replace with the desired calendar ID
      });

      res.status(200).send(getResponse.data.items)
    }catch(error){
        console.log(error)
    }
}

module.exports = {calendarSync, getEventList}