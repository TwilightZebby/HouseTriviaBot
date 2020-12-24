// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');

// THIS COMMAND
module.exports = {
    name: 'countdown',
    description: 'Shows how long is left until the next Speed Trivia Round!',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [ `${PREFIX}countdown ` ],

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
      //const Errors = client.modules.get("errorLogger");
      const SlashCommands = client.modules.get("slashModule");

      const COUNTDOWN = require('../countdown.json');
      




      
      // Date stuff
      const nextRoundDate = Date.parse(COUNTDOWN["countdown"]);
      const now = Date.now();

      // Readability
      const nextDate = new Intl.DateTimeFormat('en-GB', {
        month: 'long', day: 'numeric'
      }).format(nextRoundDate);

      // Timezones!
      const GMT = new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric', minute: 'numeric', hour12: true,
        timeZone: 'Europe/London'
      }).format(nextRoundDate);

      const CST = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', hour12: true,
        timeZone: 'America/Chicago'
      }).format(nextRoundDate);

      const EST = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', hour12: true,
        timeZone: 'America/Toronto'
      }).format(nextRoundDate);

      const PST = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', hour12: true,
        timeZone: 'America/Los_Angeles'
      }).format(nextRoundDate);

      const CET = new Intl.DateTimeFormat('en', {
        hour: 'numeric', minute: 'numeric', hour12: true,
        timeZone: 'Europe/Paris'
      }).format(nextRoundDate);

      const MST = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', hour12: true,
        timeZone: 'America/Phoenix'
      }).format(nextRoundDate);


      // Calculate difference between NextRoundDate and now
      const timeDifference = nextRoundDate > now ? nextRoundDate - now : 0;


      // Embed time
      const embed = new Discord.MessageEmbed().setColor('#008bb5');
      

      if ( timeDifference === 0 ) {
        await SlashCommands.Callback(data, `The Speed Trivia round is either ongoing or has been!`);
        delete embed; // free up cache
        return;
      }
      else {

        const timeDifferenceSeconds = timeDifference / 1000;


        if ( timeDifferenceSeconds > 60 && timeDifferenceSeconds < 3600 ) {
          embed.setDescription(`**${(timeDifferenceSeconds / 60).toFixed(1)} minutes until next Round**`);
        }
        else if ( timeDifferenceSeconds > 3600 && timeDifferenceSeconds < 86400 ) {
          embed.setDescription(`**${(timeDifferenceSeconds / 3600).toFixed(1)} hours until next Round**`);
        }
        else if ( timeDifferenceSeconds > 86400 ) {
          embed.setDescription(`**${(timeDifferenceSeconds / 86400).toFixed(1)} days until next Round**`);
        }
        else {
          embed.setDescription(`**${timeDifferenceSeconds} seconds until next Round**`);
        }




        embed.addFields(
          {
            name: `Next Speed Trivia Round`,
            value: `${nextDate}`
          },
          {
            name: `GMT`,
            value: `${GMT}`,
            inline: true
          },
          {
            name: `CST`,
            value: `${CST}`,
            inline: true
          },
          {
            name: `EST`,
            value: `${EST}`,
            inline: true
          },
          {
            name: `PST`,
            value: `${PST}`,
            inline: true
          },
          {
            name: `CET`,
            value: `${CET}`,
            inline: true
          },
          {
            name: `MST`,
            value: `${MST}`,
            inline: true
          }
        )
        .setFooter(`Does NOT update in real time!`);


        await SlashCommands.Callback(data, ``, embed);
        delete embed; // free up cache
        return;

      }

      //END OF COMMAND
    },
};
