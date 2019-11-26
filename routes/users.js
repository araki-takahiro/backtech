const models = require("../models");
var express = require("express");
var router = express.Router();
var session = require("express-session");
var sessionCheck = require("../sessions/session_check");
var userCheck = require("../sessions/user_check");
const {
  check,
  validationResult
} = require("express-validator");
var userValidator = require("../validators/user_validator");
var sessionID = null;
var referer = null;
/* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/new", function (req, res, next) {
  sessionID = req.sessionID
  res.render("new", {
    errors: null,
    sessionID: req.sessionID
  });
});

router.post("/create", userValidator, function (req, res, next) {
  if (sessionID && sessionID == req.body.session_id) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("new", {
        errors: errors,
        sessionID: sessionID
      });
    } else {
      models.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(function (user) {
        if (user) {
          req.session.user = user;
          res.redirect(302, "/users/" + user.id);
        } else {
          res.render("new", {
            errors: {
              errors: [{
                msg: "そのアドレスは既に登録してあります"
              }]
            },
            sessionID: sessionID
          });
        }
      });
    }
  } else {
    res.render("new", {
      errors: {
        errors: [{
          msg: "無効なリクエストです",
        }]
      },
      sessionID: sessionID
    })
  }
});

router.get("/login_form", function (req, res, next) {
  res.render("login_form", {
    error: null
  });
});

router.post("/login", function (req, res, next) {
  models.User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function (user) {
    if (user && req.headers.referer.indexOf('login') == -1) {
      req.session.user = user;
      if (referer) {
        res.redirect(302, referer);
      } else {
        res.redirect(302, req.headers.referer);
      }
    } else if (user) {
      req.session.user = user;
      if (referer) {
        res.redirect(302, referer);
      } else {
        res.redirect(302, "/users/" + user.id);
      }
    } else {
      if (req.headers.referer.indexOf('login') == -1) {
        referer = req.headers.referer;
      }
      res.render("login_form", {
        error: "emailかpasswordが正しくありません"
      });
    }
  });
});

router.get("/direct_show_test", function (req, res, test) {
  sessionCheck(req, res);
  res.render("direct_show_test");
})

router.get("/:id", function (req, res, next) {
  sessionCheck(req, res);
  userCheck(req, res);
  models.User.findOne({
    where: {
      id: req.session.user.id
    }
  }).then(function (user) {
    res.render("show", {
      id: user.id,
      name: user.name,
      email: user.email,
      error: null
    });
  });
});

module.exports = router;
