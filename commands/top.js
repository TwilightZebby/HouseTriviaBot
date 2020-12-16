// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require("discord.js");

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const { PREFIX } = require('../config.js');

// JSON IMPORTS
const PLAYERSCORES = require('../playerScores.json');
const HOUSESCORES = require('../houseScores.json');

// THIS COMMAND
module.exports = {
    name: 'top',
    description: 'Shows the top 10 User and House Rankings',

    // Usage(s)
    //     - Using an Array just in case there's multiple usages
    usage: [ `${PREFIX}top ` ],

    // Type of Command
    //     - Use 'general' if not in a sub-folder within .\commands\
    commandType: 'general',
    
    // Alterative command names
    aliases: ['leaderboard'],

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

      // IMPORT MODULE
      const SlashCommands = client.modules.get("slashModule");



      // Bring in points stores
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



      // Fetch first ten of Player's Scores
      let playerArray = [];
      if ( playerPoints.length < 10 ) {

        for ( let i = 0; i < playerPoints.length; i++ ) {
          const houseEmoji = playerPoints[i].houseName === "Snowman" ? "⛄" : playerPoints[i].houseName === "Elves" ? "🧝" : playerPoints[i].houseName === "Penguins" ? "🐧" : playerPoints[i].houseName === "Santa" ? "🎅" : playerPoints[i].houseName === "Reindeer" ? "🦌" : playerPoints[i].houseName === "Snowflake" ? "❄️" : "<:Grinch:783694623716802561>";
          playerArray.push(`${i + 1}) ${houseEmoji} **${playerPoints[i].username}** - ${playerPoints[i].score} points`);
        }

      }
      else {

        for ( let i = 0; i < 10; i++ ) {
          const houseEmoji = playerPoints[i].houseName === "Snowman" ? "⛄" : playerPoints[i].houseName === "Elves" ? "🧝" : playerPoints[i].houseName === "Penguins" ? "🐧" : playerPoints[i].houseName === "Santa" ? "🎅" : playerPoints[i].houseName === "Reindeer" ? "🦌" : playerPoints[i].houseName === "Snowflake" ? "❄️" : "<:Grinch:783694623716802561>";
          playerArray.push(`${i + 1}) ${houseEmoji} **${playerPoints[i].username}** - ${playerPoints[i].score} points`);
        }

      }








      // Sort Houses
      let houseSorted;

      do {

        houseSorted = false;

        for ( let i = 0; i < housePoints.length - 1; i++ ) {

          if ( housePoints[i].score < housePoints[i + 1].score ) {
            let tempHouses = housePoints[i];
            housePoints[i] = housePoints[i + 1];
            housePoints[i + 1] = tempHouses;

            houseSorted = true;
          }

        }

      } while (houseSorted === true);


      // Slap into strings
      let houseArray = [];
      for ( let i = 0; i < housePoints.length; i++ ) {
        const houseEmoji = housePoints[i].name === "Snowman" ? "⛄" : housePoints[i].name === "Elves" ? "🧝" : housePoints[i].name === "Penguins" ? "🐧" : housePoints[i].name === "Santa" ? "🎅" : housePoints[i].name === "Reindeer" ? "🦌" : housePoints[i].name === "Snowflake" ? "❄️" : "<:Grinch:783694623716802561>";
        houseArray.push(`${i + 1}) ${houseEmoji} **${housePoints[i].name}** - ${housePoints[i].score} total points`);
      }



      // Grab Author's current ranking
      let authorMember = await guild.members.fetch(data.member.user.id);
      let arrayIndex = 0;
      let authorScore;

      for ( arrayIndex; arrayIndex < playerPoints.length; arrayIndex++ ) {
        
        if ( playerPoints[arrayIndex].id === authorMember.user.id ) {
          authorScore = playerPoints[arrayIndex].score;
          break;
        }
        else {
          continue;
        }

      }




      // Send to chat
      const embed = new Discord.MessageEmbed().setColor('GOLD')
      .setTitle(`Trivia Leaderboards`)
      .setDescription(`${authorMember.displayName} - Rank \#${arrayIndex + 1} - ${authorScore} Points`)
      .addFields(
        {
          name: `Top 10 Users`,
          value: playerArray.join(`\n`)
        },
        {
          name: `House Rankings`,
          value: houseArray.join(`\n`)
        }
      );

      //await message.channel.send(embed);
      await SlashCommands.Callback(data, ``, embed);
      delete embed; // free up cache
      return;

      //END OF COMMAND
    },
};
