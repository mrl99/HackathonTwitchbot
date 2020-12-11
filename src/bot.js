import { getClient } from './client.js';
import { getAnswer } from "./answers.js";
import { COLORS } from "./config.js";
import list from 'badwords-list';

let client = getClient();
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('join', (channel, username, self) => {
  if (username === 'hackathonchatbottest') { return; }
  const newColor = getRandomColor();
  client.color(self, newColor);
  client.say(channel, `/me ─=≡Σ((( つ•̀ω•́)つ WELCOME TO THE CHANNEL ${username} ヾ(*>∀＜*)  `);
});
client.on('connected', onConnectedHandler);

const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(channel, userstate, message, self) {
  if (self) { return; } // Ignore messages from the bot
  message = message.toLowerCase();
  try {
    if (new RegExp(list.array.map(item => '(^|[^a-zA-Z]+)' + item + '($|[^a-zA-Z]+)').join("|")).test(message)) {
      console.log("###### caught bad word");
      client.say(channel, `/me (-’๏_๏’-) Hey! Don't Say That!`);
      return;
    }
    const answer = getAnswer(client, message);
    if (answer) {
      client.color(channel, "DodgerBlue");
      answer.then(response => {
        client.say(channel, `/me Hi ${userstate.username}, ${response}`);
      });
      return;
    }

    defaultFunction(message, channel);
  } catch (err) {
    console.error('Error caught in main loop: ' + err);
  }
}

function defaultFunction(message, channel) {
  // Remove whitespace from chat message
  const commandName = message.trim();
  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(channel, `You rolled a ${num}`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
