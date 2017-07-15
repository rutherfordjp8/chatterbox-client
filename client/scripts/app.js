// YOUR CODE HERE:


var app = {};

app.friends = {};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
  
  var rooms = {};
  setInterval(function() {
    app.fetch();
    
    setTimeout(function() {
      app.clearMessages();
      for ( var i = 0; i < app.messages.length; i++ ) {
        //app.renderMessage(results[i]);
        
          
        if ( rooms[app.messages[i].roomname] === undefined && app.messages[i].roomname) {
          
          //app.renderRoom(results[i].roomname);
          $('#roomSelect').prepend('<option value=' + app.messages[i].roomname + '>' + app.messages[i].roomname + '</option>');
          
          rooms[app.messages[i].roomname] = app.messages[i].roomname;
        }
        app.renderMessage(app.messages[i]);
        
      }
    
      //$('#roomSelect').find(":selected").text();
    }, 4000 );
  }, 4000);
  
  //$('#roomSelect').find(":selected").text();
  
};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    success: (data) => {
      console.log('chatterbox: Message sent');
    },
    error: (data) => {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'json',
    success: (data) => {
      console.log('chatterbox: Message received');
      app.messages = data.results;
    },
    error: (data) => {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
  
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = (message) => {
  if ( message.text === undefined ) {
    return;
  }
  var text = _.escape(message.text);
  var username = _.escape(message.username);

  if ( username === '') {
    username = 'Unknown';
  }
  
  
  $('#chats').append('<div class="chat">' + '<span class="username" onclick="app.handleUsernameClick(this)">' + username + '</span>' +
                       '<p>' + text + '</p>' + '</div>');
  
  //$('#chats').prepend(`<p>${message.username}: ${message.text}<p>`);
  app.send(message);
};

app.renderRoom = function (room) {
  $('#roomSelect').prepend('<option value=' + room + '>' + room + '</option>');
  // var results = this.fetch();
  
  // setTimeout(function() {
  //   results = results.responseJSON.results;

  //   for ( var i = 0; i < 30; i++ ) {
  //     if (results[i].roomname === room) {
  //       app.renderMessage(results[i]);
  //     }
  //   }
  // }, 2000
  // );
};

app.handleUsernameClick = function (node) {
  var username = node.textContent;
  $( '#chats .username :contains(' + username + ')' ).addClass('friend');
};

app.handleSubmit = function () {
  $.ajax({
    url: app.server,
    type: 'POST',
    success: function() {
      app.fetch();
    },
    error: function(error) {
      console.error('chatterbox: failed to send message', error);
    }
  
  });
  event.preventDefault(); 
};

$(document).ready(function() {

    

  $('#send .submit').submit(function(event) {
    app.handleSubmit();
        
  });



  app.init();
  
  
});
