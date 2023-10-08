const User = require('../../models/User');

const userList = async (req, res) => {
  try {
    // Fetch the list of users from the database
    const users = await User.findAll(); // Assuming you are using Sequelize
 
    
    
    // Send the list of users as a JSON response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = userList;
