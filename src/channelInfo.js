const fetch = require("node-fetch");

function getStream() {
    return fetch('https://api.twitch.tv/kraken/streams/618471885', {
        headers: {
            'client-id': 'y6worzdxqvwoh3syvpu2zpkoowvn1w',
            'accept': 'application/vnd.twitchtv.v5+json'
        }
    }).then(res => {
        console.log(res.json());
        return res.json();
    }).then(json => {
        return json;
    }).catch(err => {
        console.log('Problem getting stream info: ' + err);
    });
};

const getGame = () => {
    return getStream().then(res => {
        console.log(res.stream.game);
        return res.stream.game;
    });
}

getGame();
