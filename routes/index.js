var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ceo', function (req, res, next) {
  res.render('ceo', {title: 'ceo'});
});

router.get('/client', function (req, res, next) {
  // data binding 하려면 여기서 db 콜 해서 가져와야 함.
  // 참고 : https://github.com/kangsanChang/mju-dbd-teamproject/blob/master/routes/projects.js
  res.render('client', {title: 'client'});
});

module.exports = router;
