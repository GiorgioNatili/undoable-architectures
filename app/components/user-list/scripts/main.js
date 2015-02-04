/*global Userlist, $*/


window.Userlist = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

        var socket = io.connect('http://54.172.26.245:7000');

        socket.on('connect',function() {
          console.log('Client has connected to the server!');
        });
        socket.on('user add',function(data) {
          console.log('Client received a user add message from the server!', data);
         
          usersView.$el.find('> tr').remove();
          users.fetch({reset:true}); // sends HTTP GET 
        });
        socket.on('disconnect',function() {
          console.log('The client has disconnected!');
        });

      var User = Backbone.Model.extend({
         idAttribute:'_id',
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
        },
        events: {
          'click .linkshowuser':          'open',
          'click .linkdeleteuser':   'deleteUser'
        },
        open: function(e){

          var id = $(e.currentTarget).data('id');
          var item = users.get(id);

          var name = item.get("fullname");

          localStorage.setItem('currentUser', JSON.stringify(item.attributes));
          
          console.log(item.attributes);
          alert('opening ' + name);

        },
        deleteUser: function(e){

          var userID = $(e.currentTarget).attr('rel');
          alert('Deleting ' + userID);

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
