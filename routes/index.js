const models = require("../models");
var express = require("express");
var sendNewPassword = require("../mailer/request_new_password");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "TOPページ"
  });
});

router.get("/forget_password", function (req, res, next) {
  res.render("forget_password", {
    error: null
  });
});

router.post("/request_new_password", function (req, res, next) {
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    if (user) {
      var newPassword = Math.floor(Math.random() * 9000 + 1000).toString();
      user.update({
        password: newPassword
      }).then(function () {
        sendNewPassword(req, res, newPassword)
      });
    } else {
      res.render("forget_password", {
        error: "ユーザーが見つかりません"
      })
    }
  })
})

router.get("/send_complete", function (req, res, next) {
  res.render("send_complete");
});

module.exports = router;
