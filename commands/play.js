const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const {joinVoiceChannel, getVoiceConnection, AudioPlayer, createAudioPlayer, VoiceConnection, createAudioResource} = require('@discordjs/voice');


module.exports = {
    name: 'play', 
    description: 'Joins and plays a video from youtube',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
        if (!args.length) return message.channel.send('You need to send the second argument!');

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId :message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const resource = createAudioResource(ytdl(video.url), {
                inlineVolume: true
            });
            const player = createAudioPlayer();
            connection.subscribe(player);
            player.play(resource);
            player.on('idle', () => {
                try {player.stop();} catch(err) {console.log(err);}
                try {connection.destroy(); } catch(err) {console.log(String(err));}
                
            });
            await message.reply(`:musical_note:  Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No video results found');
        }
    }
}