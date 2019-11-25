var session = require("express-session");

module.exports = function userCheck(req, res) {
    if (req.session.user.id == req.params.id) {
        return; //モジュールの中でnext()使うとうまくいかない
    } else {
        return res.render("/users/" + req.session.user.id, {
            error: "無効なリクエストです"
        });
    }
}
