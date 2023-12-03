const express = require('express')
const router = express.Router();//define Router




//khai bao route METHOD(PATH,HANDLER)
router.get('/', (req, res) => {
    res.send('Hello World!')
  });
  //
router.get('/abc', (req, res) => {
res.send('check ABC')
});
router.get('/nguyenanhhieu', (req, res) => {
    res.render('sample.ejs')
});
  

module.exports = router;