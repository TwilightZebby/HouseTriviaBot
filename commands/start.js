// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX, HOSTIDS } = require('../config.js');

// THIS COMMAND
module.exports = {
    name: 'start',
    description: 'Starts a Trivia Round!',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [ `${PREFIX}start ` ],

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
    limitation: 'twilightzebby',

    // Command's cooldown, in seconds
    cooldown: 600,

    /**
     * Command's functionality
     * 
     * @param {Discord.Guild} guild 
     * @param {*} data
     * @param {*} commandData 
     */
    async execute(guild, data, commandData) {

      // MODULE IMPORTS
      const Trivia = client.modules.get("triviaModule");
      const SlashCommands = client.modules.get("slashModule");
      




      const member = await guild.members.fetch(data.member.user.id);

      // check if they have the permissions to use this command
      if ( !HOSTIDS.includes(member.user.id) ) {
        return await SlashCommands.Callback(data, `Sorry **${member.displayName}**, but you do not have the Permissions to start a Trivia Round...`);
      }
      else {
        return await Trivia.Main(guild, data, commandData, member);
      }

      //END OF COMMAND
    },
};
