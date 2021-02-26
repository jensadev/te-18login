var express = require('express');
var router = express.Router();
const authcontroller = require('../controllers/auth.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Loginsidan', username: req.session.username });
});

router.post('/logout', authcontroller.destroy);

module.exports = router;
