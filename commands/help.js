const { default: Collection } = require('@discordjs/collection');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Shows you the whole list of available commands for Androane.',
    execute(message, args) {
        let wholeMenu = "";
        // message.channel.send("These are my supported commands:\n\n");
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js') && file!=='help.js');
        const msgEmbed = new MessageEmbed()
        .setColor('#7289da')
        .setTitle('Available commands for Androane')
        for(const file of commandFiles) {
            const command = require(`../commands/${file}`);
            msgEmbed.addField(command.name,command.description);
        }
        message.channel.send({embeds: [msgEmbed]});
    }
}