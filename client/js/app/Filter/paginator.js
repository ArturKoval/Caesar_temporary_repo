'use strict';

(function (This) {

    This.PaginatorView = Backbone.View.extend({
        template: templates.paginatorTpl,
        page: 0,
        lastPage: 0,
        className: 'paginator',


        events: {
            'click .left-nav': 'openPrevPage',
            'click .right-nav': 'openNextPage'
        },

        initialize: function (options) {
            this.pageSize = options.pageSize;
            this.channel = options.channel;

            app.mediator.publish(this.channel + ' paginator: page size defined', this.pageSize);
            app.mediator.subscribe(this.channel +' paginator: pages defined', this.renderPages, {}, this);
        },

        render: function () {
            this.$el.html(this.template());
            this.$pageNav = this.$el.find('.page-nav');
            this.existence = true;
            this.renderPages({page: this.page, lastPage: this.lastPage});
            return this;
        },

        renderPages: function(params) {
            if (this.existence) {
                this.page = params.page;
                this.lastPage = params.lastPage;
                this.$pageNav.html(templates.navTpl({page: this.page + 1, lastPage: this.lastPage}));
                this.lastPage <= 1? this.$el.addClass('invisible') : this.$el.removeClass('invisible');
            }
        },

        openPrevPage: function () {
            if (this.page !== 0) {
                this.page--;
                this.$pageNav.html(templates.navTpl({page: this.page + 1, lastPage: this.lastPage}));
                app.mediator.publish(this.channel + ' paginator: page-selected', this.page);
                this.render({page: this.page, lastPage: this.lastPage});
            }
        },

        openNextPage: function () {
            if (this.page + 1 !== this.lastPage) {
                this.page++;
                this.$pageNav.html(templates.navTpl({page: this.page + 1, lastPage: this.lastPage}));
                app.mediator.publish(this.channel + ' paginator: page-selected', this.page);
                this.render({page: this.page, lastPage: this.lastPage});
            }
        }
    });
})(app);