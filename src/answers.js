import dljs from 'damerau-levenshtein-js';
import { config } from "./config.js";
import { getGame, getSrcMessage } from './channelInfo.js';

const getAmazonLink = (item) => "https://www.amazon.com/s?k=" + encodeURI(item);
const getSteamLink = (item) => "https://store.steampowered.com/search/?term=" +  encodeURI(item);

const chatQA = {
    "why is the game in japanese": Promise.resolve("Japanese text is faster, and games are generally released" +
        " earlier in Japan, so there are more exploitable bugs that are patched in other versions."),
    "when is your next stream live": Promise.resolve("I stream " + config.schedule),
    "what game is this": () => getGame().then(name => "It's " + name),
    "where can I buy this": () => getGame().then(name => "You can buy it from here " + getAmazonLink(name)),
    "what does any% mean": Promise.resolve("It means beating the game as fast as possible without using any outside" +
        " hacking tools."),
    "how can i to learn speedrun this": () => getSrcMessage(),
    "is it available on steam": () => getGame().then(name => "Please check on here: " + getSteamLink(name))
}

export function getAnswer(client, message) {
    const THRESHOLD = 12;
    let closestResponse = "";
    let closestDistance = THRESHOLD;
    for (const question of Object.keys(chatQA)) {
        const distance = dljs.distance(question, message)
        if (distance < THRESHOLD && distance < closestDistance) {
            closestResponse = chatQA[question];
            closestDistance = distance;
        }
    }
    if (closestResponse) {
        return typeof closestResponse === "function" ? closestResponse() : closestResponse
    }
}