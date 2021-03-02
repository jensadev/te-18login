exports.verify = (req, res, next) => {
  const session = req.session;
  if (!session) {
    req.flash('warn', 'Unauthenticated, please sign in.');
    res.redirect('/login');
  } else {
    if (session.loggedin) {
      next();
    } else {
      req.flash('warn', 'Unauthenticated, please sign in.');
      res.redirect('/login');
    }
  }
}