import {getClient} from './client.js';
import {getAnswer} from "./answers.js";

let client = getClient();
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('join', (channel, username, self) => {
    client.say(channel, `/me ─=≡Σ((( つ•̀ω•́)つ WELCOME TO THE CHANNEL ${username} ヾ(*>∀＜*)  `);
});
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(channel, userstate, message, self) {
    if (self) { return; } // Ignore messages from the bot

    const answer = getAnswer(client, message);
    if (answer != null) {
      client.color(channel, "DodgerBlue");
      client.say(channel, `/me Hi ${userstate.username}, ${answer}`);
    }

    defaultFunction(message, channel);
}

function defaultFunction(message, channel) {
    // Remove whitespace from chat message
    const commandName = message.trim();
    // If the command is known, let's execute it
    if (commandName === '!dice') {
        const num = rollDice();
        client.say(channel, `You rolled a ${num}`);
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
