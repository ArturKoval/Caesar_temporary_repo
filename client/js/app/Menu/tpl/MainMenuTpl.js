'use strict';

templates.MainMenuTpl = _.template([
    '<div class="containerMainMenu">', 
    '</div>',
    '<div class="logout">',
    	'<a class="logout" href="http://localhost:3000/logout">',
            '<i class="fa fa-sign-out fa-3x"></i>',
        '</a>',
    '</div>'      
].join(''));
