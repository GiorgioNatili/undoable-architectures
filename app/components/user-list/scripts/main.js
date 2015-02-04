/*global Userlist, $*/


window.Userlist = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

      var User = Backbone.Model.extend({
        defaults: {
          _id: 0,
          username: '',
          email: '',
          fullname: '',
          age: 0,
          gender: '',
          location: ''
          }
      });

      var UsersView = Backbone.View.extend({
        el: "#users-list",
        template: _.template($('#userTemplate').html()),
        render: function(eventName) {
          _.each(this.model.models, function(profile){
            var profileTemplate = this.template(profile.toJSON());
            $(this.el).append(profileTemplate);
          }, this);

          return this;
        }
      });

      var UsersCollection = Backbone.Collection.extend({
        model: User,
        url: 'http://54.172.26.245:4000/users/userlist'
      });

      var users = new UsersCollection();
      var usersView = new UsersView({model: users});
      users.bind('change reset', function () {
        usersView.render();
      });
      users.fetch({reset:true}); // sends HTTP GET 

    }
};

$(document).ready(function () {
    'use strict';
    Userlist.init();
});
