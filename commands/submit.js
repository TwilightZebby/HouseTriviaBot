// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');

// THIS COMMAND
module.exports = {
    name: 'submit',
    description: 'Submit a Question & Answer to be added to the Bot!',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [ `${PREFIX}submit "question" "answer" ` ],

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
      




      
      // Fetch Channels
      const suggestionChannel = (await client.guilds.fetch("720258928470130760")).channels.resolve("789430706581012560");

      // Fetch Author
      const authorMember = await guild.members.fetch(data.member.user.id);

      // Fetch Q & A
      const questionData = commandData.options.find(element => element.name === "question");
      const answerData = commandData.options.find(element => element.name === "answer");


      // Send Q & A to TwilightZebby
      await suggestionChannel.send(`${authorMember.user.username}#${authorMember.user.discriminator} submitted the following Q & A:\n\`\`\`QUESTION: ${questionData.value}\nANSWER: ${answerData.value}\`\`\``);

      // Send Response back to Author
      return await SlashCommands.HungryCallback(data, `**${authorMember.displayName}** - your Question & Answer have been submitted!`);



      //END OF COMMAND
    },
};
