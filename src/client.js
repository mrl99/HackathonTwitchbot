import tmi from 'tmi.js';

const opts = {
    identity: {
        username: 'HackathonChatbotTest',
        password: 'oauth:6t7p4rvao7gvpl9ekk16zcpa03i2ey'
    },
    channels: [
        'HackathonChatbotTest', 'tracici'
    ]
};

export const getClient = () => new tmi.client(opts);