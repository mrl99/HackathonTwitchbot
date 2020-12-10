import fetch from "node-fetch";

function getStream() {
    return fetch('https://api.twitch.tv/kraken/streams/618471885', {
        headers: {
            'client-id': 'y6worzdxqvwoh3syvpu2zpkoowvn1w',
            'accept': 'application/vnd.twitchtv.v5+json'
        }
    }).then(res => {
        return res.json();
    }).then(json => {
        return json;
    }).catch(err => {
        console.error('Problem getting stream info: ' + err);
    });
};

export function getGame() {
    return getStream().then(res => {
        return res.stream.game;
    });
};

export function getSrcMessage() {
    return getGame().then(gameName => {
        // src's ajax search only works if the query string is <= 31 characters
        const gameQueryString = gameName.replace(' ', '+').substr(0, 31);
        return fetch('https://www.speedrun.com/ajax_search.php?term=' + gameQueryString, {
            headers: {
                accept: "application/json"
            }
        }).then(res => {
            return res.json()
        }).then(json => {
            let srcLink;
            for (const currentGameInfo of json) {
                if (currentGameInfo.label === gameName) {
                    srcLink = 'https://speedrun.com/' + currentGameInfo.url;
                }
            }
            if (srcLink) {
                return "There are resources linked at " + srcLink;
            } else {
                return "There is no speedrun.com entry for this game, so unfortunately there probably aren't many resources to help."
            }
        }).catch(err => {
            console.error('Problem getting src link: ' + err);
            Promise.reject(err);
        });
    })
};
