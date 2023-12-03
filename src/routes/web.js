const express = require('express');
const { getHomepage,checkABC,createUser } = require('../controllers/homeController');
const router = express.Router();//define Router




//khai bao route METHOD(PATH,HANDLER)
router.get('/',getHomepage)
router.get('/abc',checkABC)
router.get('/create-user',createUser)

  //ket thuc route


  

module.exports = router;