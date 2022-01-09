function Shoutouts(config) {
    this._config = config
    this._shoutoutQueue = []
}

Shoutouts.prototype.push = function push(shoutoutModel) {
    this._shoutoutQueue.push(shoutoutModel)
    this.playNext()
}

Shoutouts.prototype.playNext = function playNext() {

    if (this._shoutoutQueue.length === 0) {
        return
    }

    const nextShoutout = this._shoutoutQueue[0]
    this._shoutoutQueue.shift()

    sendChatMessage(nextShoutout)
}


function sendChatMessage(shoutoutModel) {
    shoutoutModel.chatCallback(shoutoutModel.message)
}