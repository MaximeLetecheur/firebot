const User = require('discord.js').User;

module.exports = (bot, msg, args) => {
    if (!msg.guild) return;
    
    if (args.length != 1 && !msg.isMentioned(User)) {
        msg.channel.send(":x: Wrong use of this command.")
        return;
    }

    const idUser1 = parseInt(msg.author.id, 10);
    const idUser2 = parseInt(msg.mentions.users.first().id, 10);
    const lovePourcent = (idUser1 + idUser2) % 100;
    console.log(idUser1, idUser2);
    console.log(idUser1 + idUser2);
    console.log(lovePourcent);

    if (lovePourcent > 90) {
        msg.channel.send(":sparkling_heart: " + lovePourcent + "%");
    }
    else if (lovePourcent > 80) {
        msg.channel.send(":heart: " + lovePourcent + "%");
    }
    else if (lovePourcent > 70) {
        msg.channel.send(":smirk: " + lovePourcent + "%");
    }
    else if (lovePourcent > 60) {
        msg.channel.send(":smile: " + lovePourcent + "%");
    }
    else if (lovePourcent > 50) {
        msg.channel.send(":slight_smile: " + lovePourcent + "%");
    }
    else if (lovePourcent > 40) {
        msg.channel.send(":shrug: " + lovePourcent + "%");
    }
    else if (lovePourcent > 30) {
        msg.channel.send(":slight_frown: " + lovePourcent + "%");
    }
    else if (lovePourcent > 20) {
        msg.channel.send(":frowning2: " + lovePourcent + "%");
    }
    else if (lovePourcent > 10) {
        msg.channel.send(":poop: " + lovePourcent + "%");
    }
    else {
        msg.channel.send(":skull_crossbones: " + lovePourcent + "%");
    }
};