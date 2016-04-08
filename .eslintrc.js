module.exports = {
    "parser": "esprima",
    "env": {
        "browser": true
    },
    "globals": {
        "$": true,
        "_": true,
        "mediator": true,
        "templates": true,
        "template": true,
        "Backbone": true,
        "CS": true,
        "app": true
        
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};