const water = require('./water');

module.exports = {
    name: 'stopwater',
    description: 'Unsubscribes user to a drink-water reminder!',
    execute(message, args) {
        message.channel.send("Water reminder stopped.");
        water.stopWater();
    }
}