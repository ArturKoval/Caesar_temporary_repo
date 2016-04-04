'use strict';

window.addEventListener('load', ready);

function ready () {
    var passwordRegExp,
        enterCode = 13,
        passwordField,
        escCode = 27,
        loginRegExp,
        loginField,
        submitBtn,
        messageEl,
        form;

    form = document.querySelector('.login');
    loginField = form.querySelector('#login');
    passwordField = form.querySelector('#password');
    submitBtn = form.querySelector('.submit');
    messageEl = form.querySelector('.message');


    loginRegExp = /^[a-z]{4,10}$/i;
    passwordRegExp = /^[\S]{4,10}$/;

    document.addEventListener('keydown', keyEvent, true);
    submitBtn.addEventListener('click', login, true);

    function keyEvent (event) {
        if (event.which === enterCode) {
            login();
        } else if (event.which === escCode) {
            clear();
        }
    }

    function login () {
        messageEl.innerText = '';
        if (loginField.value.match(loginRegExp) && passwordField.value.match(passwordRegExp)) {
            sendRequest();
        } else {
            messageEl.innerText = 'Incorrect login or password. Please, try again';
            passwordField.value = '';
        }
        submitBtn.removeEventListener('click', login, true);
        document.removeEventListener('keydown', keyEvent, true);
    }

    function clear () {
        loginField.value = '';
        passwordField.value = '';
        submitBtn.removeEventListener('click', clear, true);
        document.removeEventListener('keydown', keyEvent, true);
    }

    function sendRequest () {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.location = '/home.html';
            } else if (xhr.readyState === 4) {
                messageEl.innerHTML = 'Incorrect login or password. Please, try again';
            }
        });
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({login: loginField.value, password: passwordField.value}));
    }
}