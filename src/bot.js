import tmi from 'tmi.js';
import dljs from 'damerau-levenshtein-js';

export const questionsAndAnswers = {
  "Why is the game in Japanese?": "Japanese text is faster, and games are generally released earlier in Japan, so there are more exploitable bugs that are patched in other versions."
}

export const THRESHOLD = 10;

// Define configuration options
const opts = {
  identity: {
    username: 'tracici',
    password: 'oauth:ffuem6rh61m351zcuuqiq061ay2eot'
  },
  channels: [
    'tracici'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('join', (channel, username, self) => {
  client.say(channel, `─=≡Σ((( つ•̀ω•́)つ WELCOME TO THE CHANNEL ${username} ヾ(*>∀＜*)  `);
});
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  //if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  for (const question of Object.keys(questionsAndAnswers)) {
    console.log(dljs.distance(question, msg));
    console.log(questionsAndAnswers[question])
    if (dljs.distance(question, msg) < THRESHOLD) {
       client.say(target, questionsAndAnswers[question]);
    }
  }
  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
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

