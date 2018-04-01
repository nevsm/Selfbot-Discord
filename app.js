const fs = require('fs');

const Discord = require('discord.js');
const auth = require('./config/auth.json');

var self = new Discord.Client({ autoreconnect: true });
var config = require('./config/config.json');
var commands = [];

self.on('ready', () => {
  fs.readdir('./commands/', (err, files) => {
    if (err) return err;
    console.log(files);
    files.forEach((file) => {
      if (file.startsWith) commands.push(file);
      else console.log(`Ignored ${file}.`);
    });
  });
});

self.on('message', (message) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (self.user.id !== message.author.id) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  let command = require(`./commands/` + commandName + '.js');
  command.execute(self, message, args);
});

self.login(auth.token);
