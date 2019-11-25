document.getElementById('request_new_password_submit').onclick = function () {
    document.getElementById('notice_text').innerHTML += '送信中';
    setInterval(function () {
        document.getElementById('notice_text').innerHTML = "";
        document.getElementById('notice_text').innerHTML += '送信中';
    }, 4000);
    setInterval(function () {
        document.getElementById('notice_text').innerHTML += '.';
    }, 1000)
}
