import dljs from 'damerau-levenshtein-js';

const chatQA = {
    "Why is the game in Japanese?": "Japanese text is faster, and games are generally released earlier in Japan, so there are more exploitable bugs that are patched in other versions.",
    "When is your next stream live?": "I stream everyday but Sunday.",

}

export function getAnswer(client, message){
    const THRESHOLD = 15;
    for (const question of Object.keys(chatQA)) {
        console.log(dljs.distance(question, message));
        console.log(chatQA[question]);
        if (dljs.distance(question, message) < THRESHOLD) {
            return chatQA[question];
        }
    }
}