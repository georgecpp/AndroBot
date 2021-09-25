const voice = require('@discordjs/voice');
module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        voice.getVoiceConnection(`${message.guild.id}`).disconnect();
        await message.channel.send('Leaving channel... :smiling_face_with_tear:')
 
    }
}