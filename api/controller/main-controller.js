import passport from "passport";

export const handleMain = (req, res) => {
  const currentUser = req.user;
  res.render("home", { currentUser });
};

export const handleLogin = (req, res) => {
  const currentUser = req.user;
  res.render("login", { currentUser });
};

// 카카오 로그인
export const kakaoLogin = passport.authenticate("kakao");
export const kakaoCallback = (req, res) => {
  res.redirect("/");
};
export const kakaoLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};
