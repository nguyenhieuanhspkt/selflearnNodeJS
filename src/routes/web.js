const express = require('express');
const { getHomepage,checkABC,nguyenAnhHieu } = require('../controllers/homeController');
const router = express.Router();//define Router




//khai bao route METHOD(PATH,HANDLER)
router.get('/',getHomepage)
router.get('/abc',checkABC)
router.get('/nguyenanhhieu',nguyenAnhHieu)

  //ket thuc route


  

module.exports = router;