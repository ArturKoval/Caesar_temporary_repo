var login = {
    loginRegExp: /^[a-z]{4,10}$/i,

    passwordRegExp: /^[\S]{4,10}$/,

    validate: function (login, password) {
        return login.match(this.loginRegExp) && password.match(this.passwordRegExp);
    },

    sendRequest: function (callback, data) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.location = '/';
            } else if (xhr.readyState === 4) {
                callback();
            }
        });
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }
};