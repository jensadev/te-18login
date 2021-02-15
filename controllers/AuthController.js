const { body, validationResult  } = require('express-validator');
const { query } = require('../models/db');
const bcrypt = require('bcrypt');

module.exports.store = async function(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try {
      const sql = 'SELECT password FROM users WHERE name = ?';
      const result = await query(sql, username);

      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, function(err, result) {
          if (result == true) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/topsecret');
          } else {
            res.render('login',{ error: 'Wrong username or password!'});
          }
        });
      } else {
        res.render('login',{ error: 'Wrong username or password!'});
      }
    } catch (e) {
      next(e);
      console.error(e);
    }
  } else {
    res.render('login',{ error: 'Wrong username or password!'});
  }
};