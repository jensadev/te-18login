exports.verify = (req, res, next) => {
  const session = req.session;
  if (!session) {
    res.status(401).redirect('/login');
  } else {
    if (session.loggedin) {
      next();
    } else {
      res.status(401).redirect('/login');
    }
  }
}