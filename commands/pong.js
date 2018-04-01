module.exports = {
  execute: (self, message, args) => {
    message.channel.send('Processing...').then((msg) => {
      msg.edit({embed: {
        title: "Cheese"
      }})
    });
  }
}
