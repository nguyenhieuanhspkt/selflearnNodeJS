const { render } = require('ejs');
const {connection} = require('../config/database')//import databasemodule

//code rout homepage
const getHomepage = async (req, res) => {
  const query = 'SELECT * FROM users ORDER BY id desc';
  try {
    const [results] = await connection.execute(query);

    // Assuming results is an array of objects retrieved from the database
    const usersJson = JSON.stringify(results);

    // Render the HTML using res.render
    res.render('home', { users: results, jsonData: usersJson });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getAlluser = async (req, res) => {
  const query = 'SELECT * FROM users ORDER BY id desc';
  try {
    const [results] = await connection.execute(query);
    res.json({ results });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};    


    


//code rout 1
const addUser = (req,res)=>{
    res.render('addUser.ejs')
    }
//code controller for data receiving from addUser.ejs
const postCreateUser = async (req, res) => {
  const { name, email, phone } = req.body;
  const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';

  try {
    const { results } = await connection.execute(query, [name, email, phone]);

    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }

  const query2 = 'SELECT * FROM users where id=(SELECT max(id) FROM users)';
  const [insertId] = await connection.execute(query2)

  const user = [insertId]
  console.log(user)
  res.json(user)
};

//code controller for editUser.ejs

const editUser = async (req, res) => {
 

  const userId = req.params.id;

  const query = 'SELECT * FROM users where id =?';
  try {
    // Assuming you have a database connection named 'connection'
    const [results] = await connection.execute(query, [userId]);

    // Check if results array has any elements
    if (results.length === 0) {
      // Handle the case where the user is not found
      res.status(404).send('User not found');
      return;
    }

    const userToEdit = results[0]; // Assuming you want the first result

    // Render the editUser.ejs view (create this view file)
    res.render('editUser', { userToEdit });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
};
//code controller for data receiving from editUser.ejs
const postUpdateUser = async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.params.id;
  const query = 'UPDATE users SET name=?, email=?, phone=? WHERE id=?';
  console.log(userId)
  try {
    const [results] = await connection.execute(query, [name, email, phone, userId]);

    if (!results || results.length === 0) {
      // Handle the case where the query didn't return any results
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (results.affectedRows > 0) {
      //res.redirect("/")
      // Send a success response to the client
      console.log('Data updated successfully:', results);
      res.redirect('/');

    } else {
      // Handle the case where no rows were affected (e.g., user not found)
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};



//code controller for data receiving from editUser.ejs
const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [userId]);

    // Check if any records were deleted
    if (result.affectedRows > 0) {
      console.log(result.affectedRows);
      // Send a response indicating successful deletion
      res.sendStatus(204);
    } else {
      // If no records were affected, send a 404 status with a JSON response
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    // Send a 500 status for server error
    res.sendStatus(500);
  }
};

module.exports = {
    getHomepage,addUser,postCreateUser,editUser,postUpdateUser,deleteUser,getAlluser
}