'use strict';

(function (This, app) {
    This.EditStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.studentListModalViewTpl,

        events: {
            'click .createStudent': 'createStudent',
            'click .downloadCV': 'downloadCV',
            'click .modal_editStudentlist': 'editStudent',
            'click .deleteStudent': 'deleteStudent',
            'click .exit': 'exit',
            'click th': 'tableSort'
        },
        
        initialize: function (collection) {
            this.mediator = app.mediator;
        },

        render: function () {
            this.$el.html(this.template(this.model));

            $(document).on('keydown', keyEvent.bind(this));
            function keyEvent (event) {
                if (event.which === System.constants.ESC) {
                    this.exit();
                }
            }

            return this;
        },

        createStudent: function () {
            this.mediator.publish('Students: create-request', this.model);
        },

        downloadCV: function () {
            
        },

        editStudent: function (event) {
            var eventCLasses = event.target.className; 

            if (eventCLasses.indexOf('editStudent') != -1) {
                var choosenStudent = event.target.parentElement.parentElement,
                    name = choosenStudent.querySelector('.name').innerHTML,
                    englishLevel = choosenStudent.querySelector('.english-level').innerHTML,
                    studentData;

                studentData = {
                    name: name,
                    englishLevel: englishLevel
                };

                this.mediator.publish('Students: edit request', studentData);
            }
        },

        deleteStudent: function () {

        },

        tableSort: function (e) {
            var $grid = document.querySelector('.students_list');

            sortGrid(e.target.cellIndex,e.target, e.target.id);

            function sortGrid (colNum, element, idName) {
                var tbody = $('tbody')[0],
                    rowsArray = [].slice.call(tbody.rows), //make an Array
                    compare; //comparing function

                if (colNum === 0) {
                    if (idName==='sortUp') {
                        element.removeAttribute('sortUp');
                        element.setAttribute( 'id','sortDown');
                        
                        compare = function (rowA, rowB) {   
                        return rowB.cells[colNum].innerHTML > rowA.cells[colNum].innerHTML ? 1 : -1;
                        }
    
                    } else if (idName==='sortDown') {
                        element.removeAttribute('sortDown');
                        element.setAttribute('id','sortUp');
                        
                        compare = function (rowA, rowB) {   
                        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                        }
                    
                    } else {
                        element.setAttribute('id','sortUp');
                            compare = function (rowA, rowB) {   
                            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                            }
                    }
                }
    
                if (colNum === 2) {
                    addClassRange(rowsArray);

                if (idName==='sortUp') {
                        element.removeAttribute('sortUp');
                        element.setAttribute( 'id','sortDown');
                        
                        compare = function (rowA, rowB) {   
                        return rowA.cells[colNum].className > rowB.cells[colNum].className ? 1 : -1;
                        }
    
                    } else if (idName==='sortDown') {
                        element.removeAttribute('sortDown');
                        element.setAttribute('id','sortUp');
                        
                        compare = function (rowA, rowB) {   
                        return rowB.cells[colNum].className > rowA.cells[colNum].className ? 1 : -1;
                        }
                    
                    } else {
                        element.setAttribute('id','sortUp');
        
                            compare = function (rowA, rowB) {   
                            return rowB.cells[colNum].className > rowA.cells[colNum].className ? 1 : -1;
                            }
                    }

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

        exit: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
            // app.mediator.publish('Students: renderStudentList');
            // this.$el.html('');
            // this.$el.append(this.template({'students': students}));
        }
    });
})(CS.Students, app);
