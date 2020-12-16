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
     * Listens for the Ping Slash Command
     * 
     * @param {Discord.Guild} guild 
     * @param {*} data
     * @param {*} commandData
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async Ping(guild, data, commandData) {

        // Fetch the User
        let authorMember = await guild.members.fetch(data.member.user.id);
        return await this.Callback(data, `${authorMember.displayName}, Your ping is ${authorMember.client.ws.ping.toFixed(2)}ms`);

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


        return;

    },








    
    async Callback(eventData, message) {

        const data = {
            "type": "4",
            "data": {
                "tts": false,
                "content": message,
                "embeds": [],
                "allowed_mentions": []
            }
        };

        client.api.interactions(eventData.id)[eventData.token].callback().post({data});

    }

};
