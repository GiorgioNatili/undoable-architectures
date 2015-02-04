'use strict'
angular.module('addUserWidget')
.controller('AddUserCtrl', function ($scope, $http) {

	console.log('AddUserCtrl', $scope);

  var url = 'http://54.172.26.245:4000/users/adduser'
  
  var socket = io.connect('http://54.172.26.245:7000');

  socket.on('connect',function() {
    console.log('Client has connected to the server!');
  });
  socket.on('message',function(data) {
    console.log('Client received a message from the server!', data);
  });
  socket.on('disconnect',function() {
    console.log('The client has disconnected!');
  });

  var validateInput = function(){
  
  
  };

  $scope.addUser = function(user){
  
    var newUser = {
                'username': user.name,
                'email': user.email,
                'fullname': user.fullname,
                'age': user.age,
                'location': user.location,
                'gender': user.gender
            };

    $http({
        method: 'POST',
        url: url,
        data: JSON.stringify(newUser) ,
        headers: {'Content-Type': 'application/json'}
    }).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously when the response is available
      
      // Tell the server the user has been added
      socket.emit('user add', $scope.user.name);

      // Show the user a feedback message
      $scope.user = {};
      $scope.message = 'User added correctly ' + data.msg;

    }).
    error(function(data, status, headers, config) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
      $scope.message = 'Something went wrong, ' + data.msg;
     });
  
  };

});
