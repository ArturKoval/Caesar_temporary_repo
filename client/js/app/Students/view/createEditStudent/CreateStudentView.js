'use strict';

(function (This, app) {
    This.CreateStudentView = Backbone.View.extend({
        tag: 'section',

        className: 'backdrop',

        template: templates.studentCreateTpl,

        events: {
            'click .close-modal-window': 'exit',
            'click .save-changes': 'createNewStudent',
            'click th': 'tableSort'

        },

        initialize: function () {
            this.mediator = app.mediator;
            this.listener = {
                'students': {view: 'StudentListView'},
                'editStudent': {view: 'EditStudentListView'}
            };
        },

        createNewStudent: function () { 
            var studentName = this.$el.find('[name=FirstName]').val(),
                studentSurname = this.$el.find('[name=LastName]').val(),
                englishLevel = this.$el.find('.englishLevel').val(),
                incomingScore = this.$el.find('[name=IncomingTest]').val(),
                entryScore = this.$el.find('.entryScore').val(),
                showHints = this.showHints.bind(this),
                context = this,
                approvedBy,
                validationDependencies,
                isPassedValid = true,
                newStudent;

                if( this.$el.find('.custom-approval-input').prop('disabled')) {
                    approvedBy = this.$el.find('.approvedBy').val();
                } else {
                    approvedBy = this.$el.find('.custom-approval-input').val();
                }

            validationDependencies = {
                studentName: [this.isName, studentName, 'You can use only letters, space and "-" ', 'FirstName'],
                studentSurname: [this.isName, studentSurname, 'You can use only letters, space and "-" ', 'LastName'],
                incomingScore: [this.isIncoming, incomingScore, 'You can use only numbers 0 - 1000', 'IncomingTest'],
                entryScore: [this.isScore, entryScore, 'You can use only real numbers 2 - 5', 'EntryScore'],
                approvedBy: [this.isName, approvedBy,  'You can use only letters, space and "-" ', 'CustomApproval']
            }

            $.each(validationDependencies, function (key, value) {
                if(!value[0](value[1])){
                    showHints(context, value[2], value[3]);
                    isPassedValid = false;
                }
            })

            if (isPassedValid) {
                newStudent = {
                    groupId: '',
                    name: studentName,
                    lastName: studentSurname,
                    englishLevel: englishLevel,
                    CvUrl: '',
                    avatar: '',
                    entryScore: entryScore,
                    incomingScore: incomingScore,
                    approvedBy: approvedBy
                };

                var newServerStudent = new This.Student(newStudent);
                store.students.add(newServerStudent).save();

                students.push(newStudent);
                $(document).off('keydown');
                $(document).off('click');
                this.remove();

                this.mediator.publish('Students: edit-request', this.model);
            }
        },

        isName: function (value) {
            var validator = /[A-Za-z]{1}[a-z]{1,9}[ -]{0,1}[A-Za-z]{1}[a-z]{1,9}/;
            return validator.test(value);
        },

        isIncoming: function (value) {
            value = parseInt(value);
            return (value >= 0 && value <= 1000);
        },

        isScore: function (score) {
            var result = true,
                firstDigit, decimal;
            if (isNaN(parseFloat(score))) {
                result = false;
            }
            score = score.replace(',', '.');

            if (score.indexOf(".") > 0){
                firstDigit = score.slice(0, score.indexOf("."));
                decimal =  score.slice(score.indexOf(".") + 1);
            } else {
                firstDigit= parseInt(score.charAt(0));
                decimal = score.slice(1);
            }
            if (firstDigit < 2){
                score = 2.0
            } else if (firstDigit >= 5){
                score = 5.0
            } else {
                score = firstDigit + '.' + decimal;
                score = Math.round(parseFloat(score)*10)/10;
            }
            return result;
        },

        tableSort: function (e) {
            var $grid = document.querySelector('.students_list');

            sortGrid(e.target.cellIndex, e.target, e.target.id);

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

            this.mediator.publish('Students: edit-request', this.model);
        },

        showHints: function (self, message, input) {
            var hints = [{
                    name: input,
                    text: message
                }];

            app.mediator.publish('Message', {
                type: 'hints',
                $el: self.$el,
                hints: hints
            });
        },

        render: function () {
            this.$el.html(this.template())  ;

            return this;
        }
    });
})(CS.Students, app);
