'use strict';
(function (This, app) {
    This.ContentAboutView = Backbone.View.extend({
        tagName: 'div',
        className: 'ContentAbout row',
        
        render: function () {   

            this.collection.forEach(this.renderOne, this);
                
            return this;
        },

        renderOne: function (model) {
            var groupContributorsView = new This.GroupContributorsView({model: model});

            this.$el.append(groupContributorsView.render().el)
        }
        
    });
})(CS.About, app);