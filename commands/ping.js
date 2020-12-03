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
    //     If commented out, everyone can use this command
    //limitation: 'twilightzebby',

    // Command's cooldown, in seconds
    cooldown: 10,

    /**
     * Command's functionality
     * 
     * @param {Discord.Message} message 
     * @param {Array<String>} args 
     */
    async execute(message, args) {
      
      return await message.channel.send(`Pong!\n> Your ping is ${message.client.ws.ping.toFixed(2)}ms`);

      //END OF COMMAND
    },
};
