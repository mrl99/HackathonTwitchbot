const fetch = require("node-fetch");

getStream();

function getStream() {
    fetch('https://api.twitch.tv/kraken/streams/618471885', {
        headers: {
            'client-id': 'y6worzdxqvwoh3syvpu2zpkoowvn1w',
            'accept': 'application/vnd.twitchtv.v5+json'
        }
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json);
    });
};