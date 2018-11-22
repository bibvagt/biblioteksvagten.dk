'use strict';

/**
 * Based upon https://www.scaledrone.com/blog/javascript-chat-room-tutorial/
 */
var CLIENT_ID = 'bQcjq9NjKrmnGuDb';

var drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getWhoIAm(),
    color: getRandomColor()
  }
});

var members = [];

drone.bind('open', function (error) {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  var room = drone.subscribe('observable-room', {
    historyCount: 5 // ask for the 5 latest messages from history
  });
  room.bind('open', function (error) {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.bind('history_message', function (message) {
    var _message$data = message.data,
        name = _message$data.name,
        text = _message$data.text;


    addHistoryToListDOM(name, text);
  });

  room.bind('members', function (m) {
    members = m;
    updateMembersDOM();
  });

  room.bind('member_join', function (member) {
    members.push(member);
    updateMembersDOM();
  });

  room.bind('member_leave', function (_ref) {
    var id = _ref.id;

    var index = members.findIndex(function (member) {
      return member.id === id;
    });
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.bind('data', function (text, member) {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.bind('close', function (event) {
  console.log('Connection was closed', event);
});

drone.bind('error', function (error) {
  console.error(error);
});

function getRandomName() {
  var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  var nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  return adjs[Math.floor(Math.random() * adjs.length)] + "_" + nouns[Math.floor(Math.random() * nouns.length)];
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

var DOM = {
  membersCount: document.querySelector('.colleague-chat__members-count'),
  membersList: document.querySelector('.colleague-chat__members-list'),
  messages: document.querySelector('.colleague-chat__messages'),
  input: document.querySelector('.colleague-chat__form__input'),
  form: document.querySelector('.colleague-chat__form')
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  var value = DOM.input.value;
  var sender = getWhoIAm();
  if (value === '') {
    return;
  }
  var message = {
    name: sender,
    text: value
  };

  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: message
  });
}

function createMemberElement(member) {
  var _member$clientData = member.clientData,
      name = _member$clientData.name,
      color = _member$clientData.color;

  var el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function createHistoryMemberElement(name) {
  var el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = 'gray';
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = 'Brugere online (' + members.length + '):';
  DOM.membersList.innerHTML = '';
  members.forEach(function (member) {
    return DOM.membersList.appendChild(createMemberElement(member));
  });
}

function getWhoIAm() {
  var $chatWindow = jQuery('.colleague-chat');
  var name = $chatWindow.data('name');

  return name;
}

function createMessageElement(text, member) {
  var $chatWindow = jQuery('.colleague-chat');
  var el = document.createElement('div');
  var me = getWhoIAm();
  var name = member.clientData.name;

  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text.text));
  el.className = 'message';

  // If the message is created by someone else.
  if (name !== me) {

    // Update the message status, so when the chat is closed, you get a supple notification about the new message.
    if (!$chatWindow.hasClass('open')) {
      $chatWindow.find('.colleague-chat__message-status').html('(ulæste beskeder)');
    }

    // Add a blinking background color.
    var int = 0;
    var updateStatus = setInterval(function () {
      $chatWindow.toggleClass("colleague-chat--new-message");

      if (int > 4) {
        clearInterval(updateStatus);
      }

      int++;
    }, 300);
  }

  return el;
}

function createHistoryMessageElement(text, name) {
  var el = document.createElement('div');
  el.appendChild(createHistoryMemberElement(name));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';

  return el;
}

function addMessageToListDOM(text, member) {
  var el = DOM.messages;
  var content = document.getElementsByClassName("colleague-chat__content")[0];
  el.appendChild(createMessageElement(text, member));

  // Scroll to bottom of div when message was added to the DOM.
  content.scrollTop = content.scrollHeight;
}

function addHistoryToListDOM(name, text) {
  var el = DOM.messages;

  el.appendChild(createHistoryMessageElement(text, name));
}

jQuery('.colleague-chat__heading').bind('click', function (event) {
  var $element = jQuery(this);
  var $chatWindow = $element.parents('.colleague-chat');
  var $messageStatus = $chatWindow.find('.colleague-chat__message-status');

  $chatWindow.toggleClass('open');

  // Resets the message status.
  $messageStatus.html('');

  // We need to set a session, so we can remember if the chat should be open or not.
  // This is most useful if the user is navigating around the site.
  var isOpen = $chatWindow.hasClass('open') ? 'true' : 'false';

  sessionStorage.setItem("chat_window_open", isOpen);
});

// On load.
if (sessionStorage.getItem('chat_window_open') === 'true') {
  var $chatWindow = jQuery('.colleague-chat');

  $chatWindow.addClass('open');
}