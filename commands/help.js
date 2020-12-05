// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');

// THIS COMMAND
module.exports = {
    name: 'help',
    description: 'Lists all my commands, or shows more specific information on a given command',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [
      `${PREFIX}help `,
      `${PREFIX}help command`
    ],

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
    cooldown: 4,

    /**
     * Command's functionality
     * 
     * @param {Discord.Message} message 
     * @param {Array<String>} args 
     */
    async execute(message, args) {

      // MODULE IMPORTS
      const Help = client.modules.get("helpModule");






      
      // IF NO ARGUMENT WAS GIVEN
      if ( !args.length ) {
        
        // CHECK USER FOR COMMAND LIMITATIONS
        // Owner Check
        if ( message.author.id === "156482326887530498" ) {
          return await Help.ListZebbyCommands(message);
        }
        else {
          // Standard User
          return await Help.ListCommands(message);
        }

      }
      else {

        // Fetch argument
        let argument = args[0].toLowerCase();

        
        // Bring up command details
        return await Help.CommandHelp(message, argument);

      }

      //END OF COMMAND
    },
};
