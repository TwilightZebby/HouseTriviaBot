// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
let { PREFIX } = require('../config.js');

// MODULE IMPORTS, IF ANY


// THIS COMMAND
module.exports = {
    name: 'ping',
    description: 'Returns your average ping to the Bot in milliseconds',
    usage: [ `${PREFIX}ping ` ],

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
    cooldown: 10,

    /**
     * Command's functionality
     * 
     * @param {Discord.Guild} guild 
     * @param {*} data
     * @param {*} commandData
     */
    async execute(guild, data, commandData) {

      // MODULE IMPORTS
      const SlashCommands = client.modules.get("slashModule");



      
      // Fetch the User
      let authorMember = await guild.members.fetch(data.member.user.id);
      return await SlashCommands.Callback(data, `${authorMember.displayName}, Your ping is ${authorMember.client.ws.ping.toFixed(2)}ms`);

      //END OF COMMAND
    },
};
