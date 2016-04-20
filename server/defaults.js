var defaultData = {
    stages: [{
        "name": "boarding"
    }, {
        "name": "before-start"
    }, {
        "name": "in-process"
    }, {
        "name": "offering"
    }, {
        "name": "finished"
    }],

    teachers: [{
        "name" : "M. Demchyna"
    }, {
        "name" : "M. Lopatynska"
    }, {
        "name" : "M. Plesha"
    }, {
        "name" : "V. Ryazhska"
    }, {
        "name" : "L. Halamaha"
    }, {
        "name" : "I. Kohut"
    }, {
        "name" : "L. Klakovych"
    }, {
        "name" : "V. Koldovskyy"
    }, {
        "name" : "N. Romanenko"
    }, {
        "name" : "A. Pertsov"
    }, {
        "name" : "O. Shvets"
    }, {
        "name" : "O. Reuta"
    }, {
        "name" : "I. Tsvietkov"
    }, {
        "name" : "Y. Bezgachnyuk"
    }, {
        "name" : "D. Petin"
    }, {
        "name" : "B. Yulian"
    }],

    directions: [{
        "name" : "WebUI"
    }, {
        "name": "JavaScript(UI)"
    }, {
        "name": "LAMP"
    },{
       "name": ".Net"
    }, {
        "name": "iOS"
    }, {
        "name": "C/C++"
    }, {
        "name": "Delphi"
    }, {
        "name": "RDBMS"
    }, {
        "name": "MQC"
    }, {
        "name": "ATQC"
    }, {
        "name": "ISTQB"
    }, {
        "name": "DevOps"
    }, {
        "name": "UX"
    }],


    roles: [{
        "name": "Teacher"
    }, {
        "name": "Coordinator"
    }, {
        "name": "Administrator"
    }],

    users: [{
        "firstName": "John",
        "lastName": "Doe",
        "role": "Teacher",
        "location": "Dnipro",
        "photo": "/img/default-photo.png",
    	"login": "john",
    	"password": "1234"
    }, {
        "firstName": "Dmytro",
        "lastName": "Petin",
        "role": "Coordinator",
        "location": "Dnipro",
        "photo": "/img/dmytro-petin.jpg",
    	"login": "dmytro",
    	"password": "1234"
    }],
    			
    locations: [{
        "city": "Dnipro"
    }, {
        "city": "Kyiv"
    }, {
        "city": "Sofia"
    }, {
        "city": "Chernivtsy"
    }, {
        "city": "Rivne"
    }, {
        "city":"Ivano-Frankivsk"
    }, {
        "city": "Lviv"
    }],

    groups: [{
        "name": "DP-093-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": "2016-01-02",
        "finishDate": "2016-05-01",
        "teachers": ["D. Petin"],
        "experts": ["N. Varenko"],
        "stage": "in-process",
    }, {
        "name": "DP-094-MQC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": "2016-04-20",
        "finishDate": "2016-06-22",
        "teachers": ["D. Petin"],
        "experts": ["I. Kohut"],
        "stage": "in-process"
    }, {
        "name": "DP-092-NET",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": ".Net",
        "startDate": "15-02-2016",
        "finishDate": "01-05-2016",
        "teachers": ["O. Reuta"],
        "experts": ["V. Koldovskyy"],
        "stage": "finished"
    }, {
        "name": "Lv-087-RD",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "RDBMS",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["O. Krukchov"],
        "experts": ["A. Pertsov"],
        "stage": "finished"
    }, {
        "name": "Rv-091-LAMP",
        "location": "Rivne",
        "budgetOwner": "SoftServe",
        "direction": "LAMP",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-1",
        "teachers": ["L. Klakovych"],
        "experts": ["N. Romanenko"],
        "stage": "in-process"
    }, {
        "name": "DP-095-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "JavaScript(UI)",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["D. Petin"],
        "experts": ["N. Romanenko"],
        "stage": "boarding"
    }, {
        "name": "DP-065-AQC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "ATQC",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["D. Petin"],
        "experts": ["Testman"],
        "stage": "finished"
    }, {
        "name": "DP-027-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["D. Petin"," I. Tsvietkov"],
        "experts": ["I. Tsvietkov"],
        "stage": "finished"
    }, {
        "name": "DP-097-QC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["D. Petin"],
        "experts": ["M. Omel`chuk"],
        "stage": "boarding"
    }, {
        "name": "Lv-084-QB",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "ISTQB",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["I. Tsvietkov"],
        "experts": ["M. Omel`chuk"],
        "stage": "offering"
    },
    {
        "name": "Lv-045-DL",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "Delphi",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["I. Tsvietkov"],
        "experts": ["M. Omel`chuk"],
        "stage": "in-process"
    }, {
        "name": "Lv-077-IOS",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "iOS",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["I. Tsvietkov", "M. Omel`chuk"],
        "experts": ["M. Omel`chuk"],
        "stage": "finished"
    }, {
        "name": "Lv-023-UX",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "UX",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    },
    {
        "name": "Sf-089-UX",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "UX",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "boarding"
    },
    {
        "name": "Sf-089-MQC",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    },
    {
        "name": "Sf-089-JS",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "finished"
    },
    {
        "name": "IF-089-JS",
        "location": "Ivano-Frankivsk",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    },
    {
        "name": "Kv-099-LAMP",
        "location": "Kyiv",
        "budgetOwner": "SoftServe",
        "direction": "LAMP",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    },
    {
        "name": "Ch-039-IOS",
        "location": "Chernivtsy",
        "budgetOwner": "SoftServe",
        "direction": "iOS",
        "startDate": "2016-02-15",
        "finishDate": "2016-05-01",
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    }],

    contributors: [{
        "nickname": "Team Doloto",
        "name": "Dp-080-UI",
        "logo": "/img/logoTeamDoloto.jpg",
        "direction": "javascript",
        "people": {
            "Karina Chegorko": "/img/Chegorko.jpg",
            "Alena Borysova": "/img/Borysova.jpg",
            "Serhii Andronik": "/img/Andronik.jpg",
            "Ivan Shytikov": "/img/Shytikov.jpg",
            "Dmytro Selezen": "/img/Selezen.jpg",
            "Maksim Belinskiy": "/img/Belinskiy.jpg",
            "Aleksei Lebedianskyi": "/img/Lebedianskyi.jpg"
        }
    }, {
        "nickname": "The Light side",
        "name": "Dp-082-MQC",
        "logo": "/img/logoTheLightSide.jpg",
        "direction": "mqc",
        "people": {
            "Artur Chesnokov": "/img/Chesnokov.jpg",
            "Sergey Tsova": "/img/Tsova.jpg",
            "Kateryna Bekesh": "/img/Bekesh.jpg",
            "Mihail Makarenko": "/img/Makarenko.jpg",
            "Alona Krutin": "/img/Krutin.jpg"
        }
    }, {
        "nickname": "Fluffy Dots",
        "name": "Dp-088-MQC",
        "logo": "/img/logoFluffyDots.png",
        "direction": "mqc",
        "people": {
            "Liliia Krivsun": "/Fluffy Dots/img/Krivsun.jpg",
            "Anton Fanygin": "/Fluffy Dots/img/Fanygin.jpg",
            "Svetlana Shylnenkova": "/Fluffy Dots/img/Shylnenkova.jpg",
            "Ihor Zhuhan": "/Fluffy Dots/img/Zhuhan.jpg",
            "Anastasiia Petina": "/Fluffy Dots/img/Petina.jpg",
            "Oleksandra Pervunina": "/Fluffy Dots/img/Pervunina.jpg",
            "Mariia Ananchenko": "/Fluffy Dots/img/Ananchenko.jpg"
        }
    }, {
        "nickname": "Floppy-Drive 8",
        "name": "Dp-09-JS",
        "logo": "/img/default-photo.png",
        "direction": "javascript",
        "people": {
            "Vladyslava Tyschenko": "/Floppy-Drive 8/img/Tyschenko.jpg",
            "Anastasyia Serheeva": "/Floppy-Drive 8/img/Serheeva.jpg",
            "Anna Hranovs'ka": "/Floppy-Drive 8/img/Hranovs'ka.jpg",
            "Yuryi Tataryntsev": "/Floppy-Drive 8/img/Tataryntsev.jpg",
            "Artem Zhylko": "/Floppy-Drive 8/img/Zhylko.jpg",
            "Anastasiia Manil'nykova": "/Floppy-Drive 8/img/Manil'nykova.jpg",
            "Denys Poznukhov": "/Floppy-Drive 8/img/Poznukhov.jpg",
            "Yana Sharipbaeva": "/Floppy-Drive 8/img/Sharipbaeva.jpg"
        }
    }, {
        "nickname": "Charming Chaos",
        "name": "Dp-094-MQC",
        "logo": "/img/default-photo.png",
        "direction": "mqc",
        "people": {
            "Elena Kulynenkova": "/Charming Chaos/img/Kulynenkova.jpg",
            "Lylyia Babenko": "/Charming Chaos/img/Babenko.jpg",
            "Valeryia Rusynko": "/Charming Chaos/img/Rusynko.jpg",
            "Oksana Shyrman": "/Charming Chaos/img/Shyrman.jpg",
            "Kateryna Buzykina": "/Charming Chaos/img/Buzykina.jpg",
            "Olena Petrusha": "/Charming Chaos/img/Petrusha.jpg"
        }
    }]
};

module.exports = defaultData;