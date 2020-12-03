// LIBRARY IMPORTS
const Discord = require('discord.js');

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');

// THIS MODULE
module.exports = {
    name: "help",

    /**
     * List all commands a standard User can use
     * 
     * @param {Discord.Message} message 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async ListCommands(message) {

        // Create Embed
        const embed = new Discord.MessageEmbed().setColor('#008bb5')
        .setTitle(`Command List`)
        .setDescription(client.commands.filter(command => command.commandType === "general" && !command.limitation).map(command => command.name).join(`, `))
        .addFields(
            {
                name: `\u200B`,
                value: `You can use \`${PREFIX}help [command]\` to get more information on a specific command!`
            }
        );

        await message.channel.send(embed);
        delete embed; // Free up cache
        return;

    },





























    /**
     * List all commands TwilightZebby, the Bot's Developer and Server Owner, and use
     * 
     * @param {Discord.Message} message
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async ListZebbyCommands(message) {

        // Create Embed
        const embed = new Discord.MessageEmbed().setColor('#008bb5')
        .setTitle(`TwilightZebby's Command List`)
        .setDescription(client.commands.filter(command => command.commandType === "general").map(command => command.name).join(`, `))
        .addFields(
            {
                name: `\u200B`,
                value: `You can use \`${PREFIX}help [command]\` to get more information on a specific command!`
            }
        );

        await message.channel.send(embed);
        delete embed; // Free up cache
        return;

    },
    




























    /**
     * Search for an existing command and return it
     * 
     * @param {String} name The name, or aliases, of the command
     * 
     * @returns {Promise<Object>} The Command
     */
    async CommandSearch(name) {

        // Attempt fetching of command via name
        let result = client.commands.get(name);

        if (!result) {

            // Command wasn't found by name, check aliases instead
            for ( let [key, value] of client.commands ) {

                if ( !value.aliases || value.aliases === undefined ) {
                    continue;
                }
                
                if ( value.aliases.includes(name) ) {
                    return client.commands.get(key);
                }

            }

        }
        else {
            return result;
        }

    },
        




























    /**
     * Returns details of the given command
     * 
     * @param {Discord.Message} message
     * @param {String} name Command Name or alias
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async CommandHelp(message, name) {

        // Search for command
        const command = await this.CommandSearch(name);

        if (!command) {
            // NO COMMAND FOUND
            let response = `${message.member.displayName} sorry, but I could not find a command with the name/alias of **${name}**.\nYou can use \`${PREFIX}help\` to see a list of my commands though!`;
            return await message.channel.send(response);
        }
        else {

            // If Command has a Limitation, prevent help from appearing for it if User doesn't match it
            if ( command.limitation ) {

                switch( command.limitation ) {

                    case "twilightzebby":
                        if ( message.author.id !== '156482326887530498' ) {
                            let response = `${message.member.displayName} sorry, but the **${command.name}** command is limited to TwilightZebby#1955, as such is hidden from you.`;
                            return await message.channel.send(response);
                        }



                    default:
                        break;

                }

            }









            // Command Help Details
            const embed = new Discord.MessageEmbed().setColor('#008bb5')
            .setTitle(`${command.name} command`);


            // ALIASES
            if ( command.aliases ) {
                embed.addFields({
                    name: `Alias(es)`,
                    value: `\u200B ${command.aliases.join(', ')}`
                });
            }



            // DESCRIPTION
            if ( command.description ) {
                embed.addFields({
                    name: `Description`,
                    value: `\u200B ${command.description}`
                });
            }



            // USAGE
            if ( command.usage ) {
                embed.addFields({
                    name: `Usage(s)`,
                    value: `\u200B ${command.usage.join(`\n`)}`
                });
            }



            // COOLDOWN
            if ( command.cooldown ) {
                embed.addFields({
                    name: `Cooldown`,
                    value: `\u200B ${command.cooldown} seconds`
                });
            }



            // LIMITATION
            if ( command.limitation ) {

                switch(command.limitation) {

                    case "owner":
                        embed.addFields({
                            name: `Limitation`,
                            value: `\u200B Can only be used by TwilightZebby#1955, the Server Owner`
                        });




                    default:
                        break;

                }

            }



            



            // SEND
            await message.channel.send(embed);
            delete embed; // Clear Cache
            return;

        }

    }

};