// LIBRARY IMPORTS
const Discord = require('discord.js');

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const CONFIG = require('../config.js');

// OTHER IMPORTS
const QSTORE = require('../questions.json'); // Bringing in the Questions & Answers

// THIS MODULE
module.exports = {
    name: "triviaModule",

    /**
     * Template Module Function
     * 
     * @param {Discord.Message} message 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async Main(message) {

        // MODULE IMPORTS, IF ANY
        const Errors = client.modules.get("errorLogger");






        // Fetch stuff needed
        const triviaChannel = message.channel;        

    }

};
