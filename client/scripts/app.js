// YOUR CODE HERE:
var app = {};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

app.init = function() {

  var results = this.fetch();
  setTimeout(function() {
    results = results.responseJSON.results;
    for ( var i = 0; i < 30; i++ ) {
      app.renderMessage(results[i]);
    }
  }, 2000
  );
  
  
};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'json',
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

  var output = $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    contentType: 'json',
    success: (data) => {
      console.log('chatterbox: Message received');
    },
    error: (data) => {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
  return output;
};

app.clearMessages = () => $('#chats').html(' ');


app.renderMessage = (message) => {
  username = message.username;
  text = message.text;
  $('#chats').prepend('<div class="chat">' + '<span class="username" onclick="app.handleUsernameClick()">' + username + ':' + '</span>' +
                       '<p>' + text + '</p>' + '</div>');
  //$('#chats').prepend(`<p>${message.username}: ${message.text}<p>`);
};

app.renderRoom = (room) => {
  $('#roomSelect').prepend('<option value=' + room + '>' + room + '</option>');
};

app.handleUsernameClick = function () {
  
};

app.handleSubmit = function () {
  
};

$(document).ready(function() {

  $('#send .submit').submit(function(event) {
    app.handleSubmit();
  });

  app.init();
  
  
});


































