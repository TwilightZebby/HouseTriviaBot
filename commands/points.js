// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX, NOTFESTIVEID, HOUSELEADERIDS } = require('../config.js');

// JSON IMPORTS
const PLAYERSCORES = require('../playerScores.json');
const HOUSESCORES = require('../houseScores.json');

// THIS COMMAND
module.exports = {
    name: 'points',
    description: 'Shows how many points you currently have',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [ `${PREFIX}points ` ],

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
      

      const playerPoints = Object.values(PLAYERSCORES);
      const housePoints = Object.values(HOUSESCORES);


      // bubble sort Points
      let playerSorted;

      do {

          playerSorted = false;

          for ( let i = 0; i < playerPoints.length - 1; i++ ) {

              if ( playerPoints[i].score < playerPoints[i + 1].score ) {
                  let temp = playerPoints[i];
                  playerPoints[i] = playerPoints[i + 1];
                  playerPoints[i + 1] = temp;

                  playerSorted = true;
              }

          }

      } while (playerSorted === true);






      const embed = new Discord.MessageEmbed();












      
      // Check if there was any arguments passed
      if ( !commandData.options ) {
        
        // No Arguments, fetch author's points
        const authorMember = await guild.members.fetch(data.member.user.id);


        // Check for NOT FESTIVE Role
        if ( authorMember.roles.cache.has(NOTFESTIVEID) ) {
          return await SlashCommands.Callback(data, `Sorry, but you cannot use this command since you are not in a Winter House Role. Please see <#284431777408483328> for how to assign yourself into a Winter House.`);
        }




        // Special message for House Leads
        if ( HOUSELEADERIDS.includes(authorMember.user.id) ) {
          return await SlashCommands.Callback(data, `Sorry, but the House Leads cannot earn points, just to be fair to everyone!`);
        }






        // Check Scores Store
        if ( !PLAYERSCORES[authorMember.user.id] ) {
          return await SlashCommands.Callback(data, `You haven't earnt any points yet!`);
        }




        let arrayIndex = 0;
        let authorScore;
        let houseColour;
        let authorHouse;
        let authorHousePoints;


        for ( arrayIndex; arrayIndex < playerPoints.length; arrayIndex++ ) {
        
          if ( playerPoints[arrayIndex].id === authorMember.user.id ) {
            authorScore = playerPoints[arrayIndex].score;
            authorHouse = playerPoints[arrayIndex].houseName;
            authorHousePoints = housePoints.find(house => house.name === authorHouse);
            authorHousePoints = authorHousePoints.score;
            houseColour = playerPoints[arrayIndex].houseName === "Snowman" ? "#ffffff" : playerPoints[arrayIndex].houseName === "Elves" ? "#39c06d" : playerPoints[arrayIndex].houseName === "Penguins" ? "#84f0ff" : playerPoints[arrayIndex].houseName === "Santa" ? "#ff6b6b" : playerPoints[arrayIndex].houseName === "Reindeer" ? "#c58989" : playerPoints[arrayIndex].houseName === "Snowflake" ? "#e3faf7" : "#9affa6";
            break;
          }
          else {
            continue;
          }

        }


        embed.setColor(houseColour)
        .addFields(
          {
            name: `${authorMember.displayName}`,
            value: `\* ${authorScore} Points\n\* Ranked #${arrayIndex + 1}`
          },
          {
            name: `${authorHouse}`,
            value: `${authorHousePoints} Total Points`
          }
        );

        await SlashCommands.Callback(data, ``, embed);
        delete embed; // free up cache
        return;

      }
      else {













        // Argument was passed, fetch points for given User instead
        const member = await guild.members.fetch(commandData.options[0].value);

        // Check for NOT FESTIVE Role
        if ( member.roles.cache.has(NOTFESTIVEID) ) {
          return await SlashCommands.Callback(data, `Sorry, but ${member.displayName} is not in a Winter House Role, as such I do not have any points stored for them.`);
        }




        // Special message for House Leads
        if ( HOUSELEADERIDS.includes(member.user.id) ) {
          return await SlashCommands.Callback(data, `Sorry, ${member.displayName} is one of the House Leads, and as such they cannot earn points!`);
        }





        // Check Scores Stores
        if ( !PLAYERSCORES[member.user.id] ) {
          return await SlashCommands.Callback(data, `${member.displayName} has yet to earn any points!`);
        }





        let arrayIndex = 0;
        let memberScore;
        let houseColour;
        let memberHouse;
        let memberHousePoints;


        for ( arrayIndex; arrayIndex < playerPoints.length; arrayIndex++ ) {
        
          if ( playerPoints[arrayIndex].id === member.user.id ) {
            memberScore = playerPoints[arrayIndex].score;
            memberHouse = playerPoints[arrayIndex].houseName;
            memberHousePoints = housePoints.find(house => house.name === memberHouse);
            memberHousePoints = memberHousePoints.score;
            houseColour = playerPoints[arrayIndex].houseName === "Snowman" ? "#ffffff" : playerPoints[arrayIndex].houseName === "Elves" ? "#39c06d" : playerPoints[arrayIndex].houseName === "Penguins" ? "#84f0ff" : playerPoints[arrayIndex].houseName === "Santa" ? "#ff6b6b" : playerPoints[arrayIndex].houseName === "Reindeer" ? "#c58989" : playerPoints[arrayIndex].houseName === "Snowflake" ? "#e3faf7" : "#9affa6";
            break;
          }
          else {
            continue;
          }

        }


        embed.setColor(houseColour)
        .addFields(
          {
            name: `${member.displayName}`,
            value: `\* ${memberScore} Points\n\* Ranked #${arrayIndex + 1}`
          },
          {
            name: `${memberHouse}`,
            value: `${memberHousePoints} Total Points`
          }
        );

        await SlashCommands.Callback(data, ``, embed);
        delete embed; // free up cache
        return;

      }
      

      //END OF COMMAND
    },
};
