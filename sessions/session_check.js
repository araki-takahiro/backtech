var session = require("express-session");

module.exports = function sessionCheck(req, res) {
  if (req.session.user) {
    return; //モジュールの中でnext()使うとうまくいかない
  } else {
    return res.render("login_form", {
      error: "ログインしてください"
    });
  }
}
