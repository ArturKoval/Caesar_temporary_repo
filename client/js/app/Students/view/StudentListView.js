'use strict';

(function (This, app) {
    This.StudentListView = Backbone.View.extend({
        tagName: 'table',

        className: 'students_list',

        template: templates.studentListViewTpl,

        events: {
            'click [name="studName"]': 'showStudent',
            'click th': 'tableSort'
        },


        initialize: function () {
            // app.mediator.subscribe('Students: renderStudentList', this.render);

           // this.model.on('change', this.render, this);
        },

        tableSort: function (e) {
            var $grid = document.querySelector('.students_list');

            sortGrid(e.target.cellIndex);

            function sortGrid (colNum) {
                var tbody = $('tbody')[0],
                    rowsArray = [].slice.call(tbody.rows),
                    compare;

                if (colNum === 0) {
                    compare = function (rowA, rowB) {   
                    return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                    };
                }
    
                if (colNum === 2) {
                    addClassRange(rowsArray);
                    compare = function (rowA, rowB) {        
                    return  rowB.cells[colNum].className > rowA.cells[colNum].className ? 1 : -1;
                    };
                }
                
            function addClassRange (rowsArray) {
                rowsArray.forEach(function(row) {
                    var value = row.cells[colNum].innerHTML,
                        valueClass = row.cells[colNum].classList,
                        classNumbers;

                    classNumbers = {
                        'Elementary':'0',
                        'Pre-intermediate low':'1',
                        'Pre-intermediate':'2',
                        'Pre-intermediate strong':'3',
                        'Intermediate low':'4',
                        'Intermediate':'5',
                        'Intermediate strong':'6',
                        'Upper-intermediate low':'7',
                        'Upper-intermediate':'8',
                        'Upper-intermediate strong':'9',
                        'Advanced':'a',
                        }

                    valueClass.add(classNumbers[value]);
                });
            }

            rowsArray.sort(compare);

            $grid.removeChild(tbody);

            for (var i = 0; i < rowsArray.length; i++) {
                tbody.appendChild(rowsArray[i]);
            }

            $grid.appendChild(tbody);
            }

        },

        showStudent: function () {
            // this.showStudent = new This.StudentView({model: this.model});
            // $('#modal-window').html(this.showStudent.render().el);

            alert('I will be showing a student');
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.template({'students': students}));

            return this;
        }

    });
})(CS.Groups, app);



(function (This, app) {
    This.StudentListView = Backbone.View.extend({
        tagName: 'table',

        className: 'students_list',

        template: templates.studentListViewTpl,

        events: {
            'click [name="studName"]': 'showStudent',
            'click th': 'tableSort'
        },


        initialize: function () {
            // app.mediator.subscribe('Students: selected', this....);

           // this.collection.on('change', this.render, this);
        },

        tableSort: function (e) {
            var $grid = document.querySelector('.students_list');

            sortGrid(e.target.cellIndex);

            function sortGrid (colNum) {
                var tbody = $('tbody')[0],
                    rowsArray = [].slice.call(tbody.rows),
                    compare;

                addClassRange(rowsArray);

                if (colNum === 0) {
                    compare = function (rowA, rowB) {   
                    return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                    };
                }
    
                if (colNum === 2) {
                    compare = function (rowA, rowB) {        
                    return  rowB.cells[colNum].className > rowA.cells[colNum].className ? 1 : -1;
                    };
                }
                
                function addClassRange (rowsArray) {
                rowsArray.forEach(function(row) {
                    var value = row.cells[colNum].innerHTML,
                        valueClass = row.cells[colNum].classList,
                        classNumbers;

                    classNumbers = {
                        'Elementary':'0',
                        'Pre-intermediate low':'1',
                        'Pre-intermediate':'2',
                        'Pre-intermediate strong':'3',
                        'Intermediate low':'4',
                        'Intermediate':'5',
                        'Intermediate strong':'6',
                        'Upper-intermediate low':'7',
                        'Upper-intermediate':'8',
                        'Upper-intermediate strong':'9',
                        'Advanced':'a',
                        }

                    valueClass.add(classNumbers[value]);
                });
            }
                rowsArray.sort(compare);

                $grid.removeChild(tbody);

                for (var i = 0; i < rowsArray.length; i++) {
                    tbody.appendChild(rowsArray[i]);
                }

                $grid.appendChild(tbody);
            }

        },

        showStudent: function () {
            // this.showStudent = new This.StudentView({model: this.model});
            // $('#modal-window').html(this.showStudent.render().el);

            alert('I will be showing a student');
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.template({'students': students}));

            return this;
        }

    });
})(CS.Students, app);


var students = [
    {'name': 'Anastasyia Serheeva',
    'englishLevel': 'Upper-intermediate'},
    {'name': 'Vladyslava Tyshchenko',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low'},
    {'name':'Anna Hranovska',
    'englishLevel': 'Advanced'},
    {'name':'Denis Poznukhov',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low'},
    {'name':'Yuryi Tataryntsev',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low'},
    {'name':'Artem Zhylko',
    'englishLevel': 'Advanced'},
    {'name':'Anastasiia Manilnykova',
    'avatar': 'photo url',
    'englishLevel': 'Upper-intermediate'},
    {'name':'Yana Sharipbaeva',
    'englishLevel': 'Intermediate'}
    ];