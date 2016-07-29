window.addEventListener('load', ready);

function ready () {
    var loginView = new LoginView(login);
    
    loginView.render();
}