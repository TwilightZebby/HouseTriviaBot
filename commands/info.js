// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');

// THIS COMMAND
module.exports = {
    name: 'info',
    description: 'Brings up some information about this Bot',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [ `${PREFIX}info ` ],

    // Type of Command
    //     - Use 'general' if not in a sub-folder within .\commands\
    commandType: 'general',
    
    // Alterative command names
    //aliases: [''],

    // Are Arguments required for this command
    //args: true,

    // LIMITATIONS
    //     'twilightzebby' - Only TwilightZebby#1955 can use this command
    //     'host' - Only the Round Hosts can use this command. Round Hosts are listed by USER IDs in the hidden .\config.js file
    //     If commented out, everyone can use this command
    //limitation: 'twilightzebby',

    // Command's cooldown, in seconds
    cooldown: 7,

    /**
     * Command's functionality
     * 
     * @param {Discord.Guild} guild 
     * @param {*} data
     * @param {*} commandData 
     */
    async execute(guild, data, commandData) {

      // IMPORT MODULE
      const SlashCommands = client.modules.get("slashModule");



      // Embed time!
      const embed = new Discord.MessageEmbed().setColor('#008bb5')
      .addFields(
        {
          name: `${client.user.username} Information`,
          value: `This Bot was made by TwilightZebby#1955 for use as a Inter-House Contest during December 2020.
          It features a wise range of questions, from video games to anime, science to maths, and even a few silly questions about this community!
          Zebby has made this Bot open-source for those who understand JavaScript/NodeJS and like to read code :P`
        },
        {
          name: `GitHub Link`,
          value: `[github.com/TwilightZebby/TriviaBot](https://github.com/TwilightZebby/TriviaBot)`
        }
      );

      //await message.channel.send(embed);
      await SlashCommands.Callback(data, ``, embed);
      delete embed; // free up cache
      return;

      //END OF COMMAND
    },
};
