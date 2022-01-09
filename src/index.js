let client = false
let shoutouts = false
let spokenUsers = false
let messageGenerator = false
let customAutoList = false
let teamAutoList = false

async function init() {

    setColours()

    shoutouts = new Shoutouts({})

    spokenUsers = new SpokenUsers()

    messageGenerator = new MessageGenerator(autoShoutoutChatMessage, teamShoutoutChatMessage)

    const autoShoutouts = await utils.readFileToArray('autoShoutoutList.txt')
    customAutoList = new CustomAutoList(autoShoutouts)

    const teams = await utils.readFileToArray('teamList.txt')

    const optOutList = await utils.readFileToArray('teamOptOutList.txt')
    optOutList.push(channel) // opt out broadcaster from teams

    teamAutoList = new TeamAutoList(teams, optOutList)
    await teamAutoList.load()

    connectTMIClient()
}

function connectTMIClient() {

    const tmiConfig = {
        'channels': [
            channel
        ]
    }

    if (chatPassword !== undefined && chatPassword !== '') {
        tmiConfig['identity'] = {
            'username': channel,
            'password': chatPassword
        }
    }

    client = new tmi.client(tmiConfig)

    client.on('message', onMessageHandler)
    client.on('connected', onConnectedHandler)

    client.connect()
}

function onMessageHandler(target, context, msg, self) {

    const spoken = spokenUsers.hasSpoken(context.username)

    if (spoken === true) {
        return
    }

    // Track users who have spoken
    spokenUsers.add(context.username)

    const teamChannel = teamAutoList.get(context.username)
    const customChannel = customAutoList.get(context.username)
    
    // Team Auto List Shoutout
    if (teamChannel !== undefined) {
        shoutout(context['display-name'], messageGenerator.team(teamChannel))
    } else if (customChannel !== undefined) {
        shoutout(context['display-name'], messageGenerator.custom(context['display-name']))
    }
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
}

function say(msg) {
    client.say(channel, msg)
}

function shoutout(twitchUsername, message) {
    getProfileImageURL(twitchUsername, function (username, imageURL) {
        shoutouts.push({
            username: username, 
            imageURL: imageURL,
            message: message,
            chatCallback: say
        })
    })
}