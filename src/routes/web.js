const express = require('express');
const { getHomepage,addUser,postCreateUser,editUser,postUpdateUser,deleteUser,getAlluser } = require('../controllers/homeController');
const router = express.Router();//define Router




//khai bao route METHOD(PATH,HANDLER)
router.get('/',getHomepage)
router.get('/Alluser',getAlluser)

router.get('/addUser',addUser)
router.post('/create-user',postCreateUser)
router.get('/editUser/:id',editUser)
router.post('/Update-user/:id',postUpdateUser)
router.delete('/delete/:id',deleteUser)


  //ket thuc route


  

module.exports = router;