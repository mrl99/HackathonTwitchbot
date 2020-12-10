import dljs from 'damerau-levenshtein-js';
import {config} from "./config.js";

const getAmazonLink = (item) => "https://www.amazon.com/s?k=" + encodeURI(item);

const chatQA = {
    "Why is the game in Japanese?": "Japanese text is faster, and games are generally released earlier in Japan, so there are more exploitable bugs that are patched in other versions.",
    "When is your next stream live?": "I stream " + config.schedule,
    "where can I buy this": "You can buy it from here " + getAmazonLink(config.gameName),
    "What is this game": "it's " + config.gameName,
}

export function getAnswer(client, message) {
    console.log(chatQA);
    const THRESHOLD = 12;
    for (const question of Object.keys(chatQA)) {
        console.log(dljs.distance(question, message));
        console.log(chatQA[question]);
        if (dljs.distance(question, message) < THRESHOLD) {
            return chatQA[question];
        }
    }
}

//TODO game name can be GET from the stream info