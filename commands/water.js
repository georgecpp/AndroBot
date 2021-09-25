let interval;
function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}
module.exports = {
    name: 'water',
    description: 'Subscribes user to a drink-water reminder!',
    execute(message, args) {
        message.channel.send("Subscribed to water reminder.");
        var valMSeconds = 3600000;
        if(args[0] && isNumeric(args[0])) {
            valMSeconds = args[0]*1000;
        }
        interval = setInterval(function() {
            message.channel.send("Drink water. Stay hydrated.")
            .catch(console.error);
        }, valMSeconds); // every hour.
    },
    stopWater() {
        if(interval) {
            clearInterval(interval);
        }
    }
}