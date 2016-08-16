'use strict';

(function (This) {
    This.StudentListView = Backbone.View.extend({
        // subscribes: {
        //     'Students: edit-request': '',
        //     'Students: delete-request': '',
        //     'Students: create-request': '',
        // },

        tagName: 'table',

        className: 'students_list',

        template: templates.studentListViewTpl,

        events: {
            'click [name="studName"]': 'showStudent',
            'click th': 'tableSort'
        },


        initialize: function () {
            // app.mediator.subscribe('Students: selected', this....);
            // app.mediator.subscribe('Students: selected', this....);
            // app.mediator.subscribe('Students: saved', this....);

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
        
                    return rowA.cells[colNum].className > rowB.cells[colNum].className ? 1 : -1;
                    };
                }
                
                function addClassRange(rowsArray) {
                    rowsArray.forEach(function(row) {
                        if (row.cells[colNum].innerHTML === 'Beginer') {
                            row.cells[colNum].classList.add('0');
                        } else if (row.cells[colNum].innerHTML === 'Elementary') {
                            row.cells[colNum].classList.add('1');
                        } else if (row.cells[colNum].innerHTML === 'Pre-intermediate') {
                            row.cells[colNum].classList.add('2');
                        } else if (row.cells[colNum].innerHTML === 'Intermediate') {
                            row.cells[colNum].classList.add('3');
                        } else if (row.cells[colNum].innerHTML === 'Upper-intermediate') {
                            row.cells[colNum].classList.add('4');
                        } else if (row.cells[colNum].innerHTML === 'Advanced') {
                            row.cells[colNum].classList.add('5');
                        }
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
})(CS.Groups);

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