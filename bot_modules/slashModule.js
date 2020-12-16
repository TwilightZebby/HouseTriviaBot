// LIBRARY IMPORTS
const Discord = require('discord.js');

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');


/*
 * type list:
 * 1 = SubCommand
 * 2 = SubCommandGroup
 * 3 = String
 * 4 = Integer
 * 5 = Boolean
 * 6 = User
 * 7 = Channel
 * 8 = Role
*/

// THIS MODULE
module.exports = {
    name: "slashModule",


    /**
     * Registers the Ping Slash Command
     * 
     * @param {Discord.Guild} guild 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async RegisterPing(guild) {

        // Data
        const data = {};
        data.name = "ping";
        data.description = "Test if the Bot responds";

        client.api.applications(client.user.id).guilds(guild.id).commands().post({data});

    },





    /**
     * Registers the Info Slash Command
     * 
     * @param {Discord.Guild} guild 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async RegisterInfo(guild) {

        // Data
        const data = {};
        data.name = "info";
        data.description = "Brings up basic information about this Bot";

        client.api.applications(client.user.id).guilds(guild.id).commands().post({data});

    },








    /**
     * Registers the Top Slash Command
     * 
     * @param {Discord.Guild} guild 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async RegisterTop(guild) {

        // Data
        const data = {};
        data.name = "top";
        data.description = "Shows the current User and House rankings, including your own";

        client.api.applications(client.user.id).guilds(guild.id).commands().post({data});

    },









    /**
     * Registers the Start Slash Command
     * 
     * @param {Discord.Guild} guild 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async RegisterStart(guild) {

        // Data
        const data = {};
        data.name = "start";
        data.description = "Starts a Trivia Round. Can only be used by selected Round Hosts";

        client.api.applications(client.user.id).guilds(guild.id).commands().post({data});

    },
    


















    /**
     * Registers the Slash Commands within Discord's Slash Command API
     * 
     * @param {Discord.Guild} guild 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async RegisterCommands(guild) {

        // Go through and register all the commands
        await this.RegisterPing(guild);
        await this.RegisterInfo(guild);
        await this.RegisterTop(guild);
        await this.RegisterStart(guild);


        return;

    },








    /**
     * Responds to a Slash Command Interaction
     * 
     * @param {*} eventData
     * @param {String} message
     * @param {Discord.MessageEmbed} [embed]
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async Callback(eventData, message, embed) {

        const data = {
            "type": "4",
            "data": {
                "tts": false,
                "content": message,
                "embeds": embed === undefined ? [] : [embed],
                "allowed_mentions": []
            }
        };

        client.api.interactions(eventData.id)[eventData.token].callback().post({data});

    }

};
