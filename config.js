// REQUIRED
// Put your channel name here e.g., 'thoseEyes'
const channel = 'yourChannelNameHere'

// REQUIRED
// Paste Twitch Chat OAuth Password from here: https://twitchapps.com/tmi/
// e.g., 'oath:somethingsomething'
const chatPassword = ''

// Template for the auto shoutout message sent to chat
// Variables: {user} {link}
const autoShoutoutChatMessage = '!so {user}'

// Template for the team shoutout message sent to chat
// Variables: {user} {link} {team} {teamlink}
const teamShoutoutChatMessage = "!so {user}"

// Do not touch this stuff x
const config = { 'Client-ID': '9l8ufsalz4hqlzzl1g0mr7e38uxx1m',
                 'Authorization': `Bearer ${token}` }
