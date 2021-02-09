var express = require('express');
var router = express.Router();

/* GET login form */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', {title: 'Schoolsoft'});
});

/* POST login */
router.post('/', function(req, res, next) {

  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  if (password == "Secret123") {
    res.send('Topsecret!');
  } else {
    res.redirect('/login');
  }


});


module.exports = router;
