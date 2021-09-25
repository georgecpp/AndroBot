const Reddit = require("@cxllm/reddit");
const {random, top, rising, newPost} = require("@cxllm/reddit") //in this context, "newPost" must be used as new collides with the constructor
module.exports = {
    name: 'meme',
    description: 'fetches random meme from reddit!',
    execute(message, args) {
        message.channel.send('Here\'s your meme:');
        const sub = "memes"; //you can also use r/memes as it slices it in the function
        (async () => {
            try {
                const img = await (await Reddit.random(sub)).image;
                message.channel.send(img) //fetches a random post from r/memes
            } catch (error) { //catches the error if a subreddit doesn't exist
                message.channel.send(error);
            }
        })()
    }
}