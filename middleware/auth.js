export const onlyPublic = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render("user.html");
  }
};
