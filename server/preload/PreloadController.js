'use strict';
var Rotor = require('../libs/rotor/rotor');

var PreloadController = Rotor.Controller.extend({
	initialize: function (request, resp, action) {
        var reqBody = this.getRequestData(request);

        this.response = resp;
        this.answer = this.getPreloadData(this.sendResponse.bind(this));  
    },

    getPreloadData: function (callback) {
    	var collections = {
		    'users': [{
		        "firstName": "John",
		        "lastName": "Doe",
		        role: "ITA Teacher",
		        "location": "Dnipro",
		        "photo": "/default-photo.png"
		    }, {
		        "firstName": "Dmytro",
		        "lastName": "Petin",
		        role: "ITA Coordinator",
		        "location": "Dnipro",
		        "photo": "/default-photo.png"
		    }],

		    'locations': [{
		        "city": "Dnipro"
		    }, {
		        "city": "Kiev"
		    }],

		    'groups': [{
		        name: 'DP-093-JS',
		        location: 'Dnipro',
		        budgetOwner: 'SoftServe',
		        direction: 'Web UI',
		        startDate: '01.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Dmytro Petin'],
		        experts: ['Nodarii'],
		        stage: 'in process'
		    }, {
		        name: 'DP-094-MQC',
		        location: 'Dnipro',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Dmytro Petin'],
		        experts: ['Testman'],
		        stage: 'in process'
		    }, {
		        name: 'DP-092-NET',
		        location: 'Dnipro',
		        budgetOwner: 'SoftServe',
		        direction: 'ASP.NET developing',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Dmytro Petin'],
		        experts: ['Testman'],
		        stage: 'in process'
		    }, {
		        name: 'Lv-087-MQC',
		        location: 'Lviv',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Oleg Krukchov'],
		        experts: ['Testman'],
		        stage: 'finished'
		    }, {
		        name: 'Rv-091-MQC',
		        location: 'Rivne',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Danylo Golubev'],
		        experts: ['Testman'],
		        stage: 'in process'
		    }, {
		        name: 'DP-095-JS',
		        location: 'Dnipro',
		        budgetOwner: 'SoftServe',
		        direction: 'Web UI',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Dmytro Petin'],
		        experts: ['Testman'],
		        stage: 'planned'
		    }, {
		        name: 'DP-065-QC',
		        location: 'Dnipro',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Dmytro Petin'],
		        experts: ['Testman'],
		        stage: 'planned'
		    }, {
		        name: 'DP-027-JS',
		        location: 'Dnipro',
		        budgetOwner: 'SoftServe',
		        direction: 'Web UI',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Dmytro Petin'],
		        experts: ['Testman'],
		        stage: 'planned'
		    }, {
		        name: 'DP-035-QC',
		        location: 'Dnipro',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Dmytro Petin'],
		        experts: ['Testman'],
		        stage: 'planned'
		    }, {
		        name: 'Lv-084-MQC',
		        location: 'Lviv',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Oleg Krukchov'],
		        experts: ['Testman'],
		        stage: 'finished'
		    }, {
		        name: 'Lv-077-MQC',
		        location: 'Lviv',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Oleg Krukchov'],
		        experts: ['Testman'],
		        stage: 'finished'
		    }, {
		        name: 'Lv-023-MQC',
		        location: 'Lviv',
		        budgetOwner: 'SoftServe',
		        direction: 'Manual Control Quality Systems',
		        startDate: '15.02.2016',
		        finishDate: '01.05.2016',
		        teachers: ['Oleg Krukchov'],
		        experts: ['Testman'],
		        stage: 'finished'
		    }]
		};

		callback('', collections);
    }
});

module.exports = new PreloadController();