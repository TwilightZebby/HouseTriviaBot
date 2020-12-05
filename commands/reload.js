// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');

// THIS COMMAND
module.exports = {
    name: 'reload',
    description: 'Used to reload a command or module of the Bot',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [ `${PREFIX}reload commandName`, `${PREFIX}reload moduleName` ],

    // Type of Command
    //     - Use 'general' if not in a sub-folder within .\commands\
    commandType: 'general',
    
    // Alterative command names
    //aliases: [''],

    // Are Arguments required for this command
    args: true,

    // LIMITATIONS
    //     'twilightzebby' - Only TwilightZebby#1955 can use this command
    //     'host' - Only the Round Hosts can use this command. Round Hosts are listed by USER IDs in the hidden .\config.js file
    //     If commented out, everyone can use this command
    limitation: 'twilightzebby',

    // Command's cooldown, in seconds
    cooldown: 10,

    /**
     * Command's functionality
     * 
     * @param {Discord.Message} message 
     * @param {Array<String>} args 
     */
    async execute(message, args) {

      // MODULE IMPORTS, IF ANY
      const Errors = client.modules.get("errorLogger");
      




      
      // Fetch input & command/module
      const argumentName = args.shift();
      let command = client.commands.get(argumentName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
      let module;

      if ( !command ) {

        // No command was found, attach module fetch instead
        module = client.modules.get(argumentName);

        if ( !module ) {

          // No module was found either, return error
          return await Errors.LogToUser(message.channel, `Sorry, but I wouldn't find a command or module with that name...`);

        }


        // MODULES
        // Delete from cache first
        delete require.cache[require.resolve(`../bot_modules/${argumentName}.js`)];


        // Fetch updated Module
        try {

          let newModule = require(`../bot_modules/${argumentName}.js`);
          client.modules.set(newModule.name, newModule);
          return await message.channel.send(`Successfully reloaded the **${newModule.name}** Module!`);

        } catch (err) {

          await Errors.LogCustom(err, `Error while reloading ${argumentName} Module:`);
          return await Errors.LogToUser(message.channel, `I was unable to reload the ${argumentName} Module...`);

        }

      }








      // Delete from cache first
      delete require.cache[require.resolve(`../commands/${argumentName}.js`)];


      // Fetch updated Command
      try {

        let newCommand = require(`../commands/${argumentName}.js`);
        client.commands.set(newCommand.name, newCommand);
        return await message.channel.send(`Successfully reloaded the **${newCommand.name}** Command!`);

      } catch (err) {

        await Errors.LogCustom(err, `Error while reloading ${argumentName} Command:`);
        return await Errors.LogToUser(message.channel, `I was unable to reload the ${argumentName} Command...`);

      }

      //END OF COMMAND
    },
};
