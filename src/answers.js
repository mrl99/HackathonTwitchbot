import dljs from 'damerau-levenshtein-js';
import { config } from "./config.js";
import { getGame, getSrcMessage } from './channelInfo.js';

const getAmazonLink = (item) => "https://www.amazon.com/s?k=" + encodeURI(item);
const gameName = getGame();
const srcMsg = getSrcMessage();

const chatQA = {
    "Why is the game in Japanese": Promise.resolve("Japanese text is faster, and games are generally released earlier in Japan, so there are more exploitable bugs that are patched in other versions."),
    "When is your next stream live": Promise.resolve("I stream " + config.schedule),
    "What game is this": gameName.then(name => "It's " + name),
    "where can I buy this": Promise.resolve("You can buy it from here " + getAmazonLink(gameName)),
    "What does any% mean": Promise.resolve("It means beating the game as fast as possible without using any outside hacking tools."),
    "How can I learn to speedrun this game": srcMsg
}

export function getAnswer(client, message) {
    const THRESHOLD = 15;
    let closestResponse = "";
    let closestDistance = THRESHOLD;
    for (const question of Object.keys(chatQA)) {
        const distance = dljs.distance(question, message)
        if (distance < THRESHOLD && distance < closestDistance) {
            closestResponse = chatQA[question];
            closestDistance = distance;
        }
    }
    return closestResponse !== "" ? closestResponse : undefined;
}