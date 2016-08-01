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
    }, {
        "name": "planned"
    }],

    // teachers: [{
    //     "name": "M. Demchyna"
    // }, {
    //     "name": "M. Lopatynska"
    // }, {
    //     "name": "M. Plesha"
    // }, {
    //     "name": "V. Ryazhska"
    // }, {
    //     "name": "L. Halamaha"
    // }, {
    //     "name": "I. Kohut"
    // }, {
    //     "name": "L. Klakovych"
    // }, {
    //     "name": "V. Koldovskyy"
    // }, {
    //     "name": "N. Romanenko"
    // }, {
    //     "name": "A. Pertsov"
    // }, {
    //     "name": "O. Shvets"
    // }, {
    //     "name": "O. Reuta"
    // }, {
    //     "name": "I. Tsvietkov"
    // }, {
    //     "name": "Y. Bezgachnyuk"
    // }, {
    //     "name": "D. Petin"
    // }, {
    //     "name": "B. Yulian"
    // }, {
    //     "name": "A. Korkuna"
    // }],

    directions: [{
        "name": "WebUI"
    }, {
        "name": "JavaScript(UI)"
    }, {
        "name": "LAMP"
    }, {
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
        "firstName": "Kirill",
        "lastName": "Kozak",
        "role": "Administrator",
        "location": "Dnipro",
        "photo": "/img/andriy-pereymybida.png",
        "login": "qwerty",
        "password": "1234"
    }, {
        "firstName": "Petr",
        "lastName": "Kucher",
        "role": "Administrator",
        "location": "Dnipro",
        "photo": "/img/peter_kucher.jpg",
        "login": "hello",
        "password": "1234"
    },

    {
        "firstName": "Andriy",
        "lastName": "Pereymybida",
        "role": "Administrator",
        "location": "Lviv",
        "photo": "/img/andriy-pereymybida.png",
        "login": "admin",
        "password": "1234"
    }, {
        "firstName": "Dmytro",
        "lastName": "Petin",
        "role": "Coordinator",
        "location": "Dnipro",
        "photo": "/img/dmytro-petin.jpg",
        "login": "dmytro",
        "password": "1234"
    }, {
        "firstName": "Olexandr",
        "lastName": "Reuta",
        "role": "Teacher",
        "location": "Dnipro",
        "photo": "/img/olexander-reuta.png",
        "login": "sasha",
        "password": "1234"
    }, {
        "firstName": "Artur",
        "lastName": "Koval",
        "role": "Administrator",
        "location": "Dnipro",
        "photo": "",
        "login": "artur",
        "password": "1234"
    }],

    locations: [{
        "acronym": "Dp",
        "name": "Dnipro",
        "lastGroupNumber": 97
    }, {
        "acronym": "Kv",
        "name": "Kyiv",
        "lastGroupNumber": 99
    }, {
        "acronym": "Sf",
        "name": "Sofia",
        "lastGroupNumber": 89
    }, {
        "acronym": "Ch",
        "name": "Chernivtsy",
        "lastGroupNumber": 39
    }, {
        "acronym": "Rv",
        "name": "Rivne",
        "lastGroupNumber": 91
    }, {
        "acronym": "IF",
        "name": "Ivano-Frankivsk",
        "lastGroupNumber": 89
    }, {
        "acronym": "Lv",
        "name": "Lviv",
        "lastGroupNumber": 87
    }],

    groups: [{
        "name": "DP-093-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1454284800,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["N. Varenko"],
        "stage": "in-process"
    }, {
        "name": "DP-094-MQC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": 1461110400,
        "finishDate": 1466553600,
        "teachers": ["D. Petin"],
        "experts": ["I. Kohut"],
        "stage": "in-process"
    }, {
        "name": "DP-092-NET",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": ".Net",
        "startDate": 1455580800,
        "finishDate": 1462060800,
        "teachers": ["O. Reuta"],
        "experts": ["V. Koldovskyy"],
        "stage": "finished"
    }, {
        "name": "Lv-087-RD",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "RDBMS",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["O. Krukchov"],
        "experts": ["A. Pertsov"],
        "stage": "finished"
    }, {
        "name": "Rv-091-LAMP",
        "location": "Rivne",
        "budgetOwner": "SoftServe",
        "direction": "LAMP",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["L. Klakovych"],
        "experts": ["N. Romanenko"],
        "stage": "in-process"
    }, {
        "name": "DP-095-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "JavaScript(UI)",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["N. Romanenko"],
        "stage": "boarding"
    }, {
        "name": "DP-065-AQC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "ATQC",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["Testman"],
        "stage": "finished"
    }, {
        "name": "DP-027-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin", "I. Tsvietkov"],
        "experts": ["I. Tsvietkov"],
        "stage": "finished"
    }, {
        "name": "DP-097-QC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["M. Omel`chuk"],
        "stage": "boarding"
    }, {
        "name": "Lv-084-QB",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "ISTQB",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["I. Tsvietkov"],
        "experts": ["M. Omel`chuk"],
        "stage": "offering"
    }, {
        "name": "Lv-045-DL",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "Delphi",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["I. Tsvietkov"],
        "experts": ["M. Omel`chuk"],
        "stage": "in-process"
    }, {
        "name": "Lv-077-IOS",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "iOS",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["I. Tsvietkov", "M. Omel`chuk"],
        "experts": ["M. Omel`chuk"],
        "stage": "finished"
    }, {
        "name": "Lv-023-UX",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "UX",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    }, {
        "name": "Sf-089-UX",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "UX",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "boarding"
    }, {
        "name": "Sf-089-MQC",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    }, {
        "name": "Sf-089-JS",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "finished"
    }, {
        "name": "IF-089-JS",
        "location": "Ivano-Frankivsk",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    }, {
        "name": "Kv-099-LAMP",
        "location": "Kyiv",
        "budgetOwner": "SoftServe",
        "direction": "LAMP",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    }, {
        "name": "Ch-039-IOS",
        "location": "Chernivtsy",
        "budgetOwner": "SoftServe",
        "direction": "iOS",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process"
    }],

    contributors: [{
        "nickname": "Team Doloto",
        "name": "Dp-080-UI",
        "logo": "/img/TeamDoloto/logoTeamDoloto.jpg",
        "direction": "Development & Research",
        "people": {
            "Karina Chegorko": "/img/TeamDoloto/Chegorko.jpg",
            "Alena Borysova": "/img/TeamDoloto/Borysova.jpg",
            "Serhii Andronik": "/img/TeamDoloto/Andronik.jpg",
            "Ivan Shytikov": "/img/TeamDoloto/Shytikov.jpg",
            "Dmytro Selezen": "/img/TeamDoloto/Selezen.jpg",
            "Maksim Belinskiy": "/img/TeamDoloto/Belinskiy.jpg",
            "Aleksei Lebedianskyi": "/img/TeamDoloto/Lebedianskyi.jpg"
        }
    }, {
        "nickname": "The Light side",
        "name": "Dp-082-MQC",
        "logo": "/img/TheLightSide/logoTheLightSide.jpg",
        "direction": "Quality Assurance",
        "people": {
            "Artur Chesnokov": "/img/TheLightSide/Chesnokov.jpg",
            "Sergey Tsova": "/img/TheLightSide/Tsova.jpg",
            "Kateryna Bekesh": "/img/TheLightSide/Bekesh.jpg",
            "Mihail Makarenko": "/img/TheLightSide/Makarenko.jpg",
            "Alona Krutin": "/img/TheLightSide/Krutin.jpg"
        }
    }, {
        "nickname": "Fluffy Dots",
        "name": "Dp-088-MQC",
        "logo": "/img/FluffyDots/logoFluffyDots.png",
        "direction": "Quality Assurance",
        "people": {
            "Liliia Krivsun": "/img/FluffyDots/Krivsun.jpg",
            "Anton Fanygin": "/img/FluffyDots/Fanygin.jpg",
            "Svetlana Shylnenkova": "/img/FluffyDots/Shylnenkova.jpg",
            "Ihor Zhuhan": "/img/FluffyDots/Zhuhan.jpg",
            "Anastasiia Petina": "/img/FluffyDots/Petina.jpg",
            "Oleksandra Pervunina": "/img/FluffyDots/Pervunina.jpg",
            "Mariia Ananchenko": "/img/FluffyDots/Ananchenko.jpg"
        }
    }, {
        "nickname": "Floppy-Drive 8",
        "name": "Dp-09-JS",
        "logo": "/img/Floppy-Drive-8/logo-floppy-drive-8.png",
        "direction": "Development & Research",
        "people": {
            "Vladyslava Tyschenko": "/img/Floppy-Drive-8/Tyschenko.jpg",
            "Anastasyia Serheeva": "/img/Floppy-Drive-8/Serheeva.jpg",
            "Anna Hranovs'ka": "/img/Floppy-Drive-8/Hranovs'ka.jpg",
            "Yuryi Tataryntsev": "/img/Floppy-Drive-8/Tataryntsev.jpg",
            "Artem Zhylko": "/img/Floppy-Drive-8/Zhylko.jpg",
            "Anastasiia Manil'nykova": "/img/Floppy-Drive-8/Manil'nykova.jpg",
            "Denys Poznukhov": "/img/Floppy-Drive-8/Poznukhov.jpg",
            "Yana Sharipbaeva": "/img/Floppy-Drive-8/Sharipbaeva.jpg"
        }
    }, {
        "nickname": "Charming Chaos",
        "name": "Dp-094-MQC",
        "logo": "/img/CharmingChaos/logoCharmingChaos.jpg",
        "direction": "Quality Assurance",
        "people": {
            "Elena Kulynenkova": "/img/CharmingChaos/Kulynenkova.jpg",
            "Lylyia Babenko": "/img/CharmingChaos/Babenko.jpg",
            "Valeryia Rusynko": "/img/CharmingChaos/Rusynko.jpg",
            "Oksana Shyrman": "/img/CharmingChaos/Shyrman.jpg",
            "Kateryna Buzykina": "/img/CharmingChaos/Buzykina.jpg",
            "Olena Petrusha": "/img/CharmingChaos/Petrusha.jpg"
        }
    }]
};

module.exports = defaultData;