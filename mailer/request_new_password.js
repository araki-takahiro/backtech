var nodemailer = require("nodemailer");

module.exports = async function sendNewPassword(req, res, newPassword) {
    var testAccount = await nodemailer.createTestAccount();

    var smtp = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    var message = {
        from: 'sanju13gh60ki@gmail.com',
        to: req.body.email,
        subject: 'nodemailer test mail',
        text: newPassword
    };
    try {
        smtp.sendMail(message, function (error, info) {
            // エラー発生時
            if (error) {
                return res.render("forget_password", {
                    error: "メールの送信に失敗しました"
                })
            }
            // 送信成功
            res.redirect(302, "/send_complete");
        });
    } catch (e) {
        res.render("forget_password", {
            error: "エラーが発生しました。時間を置いてお試しください"
        });
    }
}
