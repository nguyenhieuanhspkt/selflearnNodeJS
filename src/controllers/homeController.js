const connection = require('../config/database')//import databasemodule

//code rout homepage
const getHomepage = (req,res)=>{
 
    return res.render('home.ejs')
}
//code rout 1
const checkABC = (req,res)=>{
    res.send('check ABC')
    }
//code rout 2
const createUser = (req, res) => {
    res.render('sample.ejs')
}




module.exports = {
    getHomepage,checkABC,createUser
}