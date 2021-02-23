const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show = async function(req, res, next) {
  if (req.session.loggedin) {
    return redirect('/home');
  }
  return res.render('register');
};

module.exports.store = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('register', { errors: errors.array() });
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // res.json({
    //   username: username,
    //   email: email,
    //   password: password
    // });

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) throw err;
      try {
        const sql = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, now(), now())';
        const result = await query(sql, [username, email, hash]);

        if (result.insertId > 0) {
          res.render('login', {username: username});
        }

      } catch (e) {
        next(e);
        console.error(e);
      }
    });

    // try {
    //   const sql = 'SELECT password FROM users WHERE name = ?';
    //   const result = await query(sql, username);

    //   if(result.length > 0) {
    //     bcrypt.compare(password, result[0].password, function(err, result) {
    //       if (result == true) {
    //         req.session.loggedin = true;
    //         req.session.username = username;
    //         res.redirect('/home');
    //       } else {
    //         return res.status(401)
    //           .render('login',{ username: req.body.username, errors: 'Wrong username or password!'});
    //       }
    //     });
    //   } else {
    //     return res.status(401)
    //       .render('login',{ username: req.body.username, errors: 'Wrong username or password!'});
    //   }
    // } catch (e) {
    //   next(e);
    //   console.error(e);
    // }
};