const {Client, Intents, Collection, Message} = require('discord.js');
const axios = require('axios').default; 
require('dotenv').config(); //initialize dotenvKT
const fs = require('fs');
const prefix = '!';

const client = new Client({
    intents:
    [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async (msg) => {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/); // split by spaces " "
    const command = args.shift().toLowerCase();
    if(command === 'ping') {
        client.commands.get('ping').execute(msg, args);
    }
    else if(command === 'meme') {
        client.commands.get('meme').execute(msg,args);
    }
    else if(command === 'water') {
        client.commands.get('water').execute(msg, args);
    }
    else if(command === 'stopwater') {
        client.commands.get('stopwater').execute(msg, args);
    }
});



//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token