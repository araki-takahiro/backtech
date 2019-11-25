const { check, validationResult } = require("express-validator");

module.exports = [
  check("email")
    .isEmail()
    .withMessage("有効なメールアドレスを入力してください"),
  check("email")
    .not("")
    .isEmpty()
    .withMessage("アドレスに未入力や、スペースを含まないでください"),
  check("name")
    .not("")
    .isEmpty()
    .withMessage("名前に未入力や、スペースを含まないでください"),
  check("password")
    .not("")
    .isEmpty()
    .withMessage("パスワードに未入力や、スペースを含まないでください")
];
