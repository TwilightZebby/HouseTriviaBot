// LIBRARY IMPORTS
const fs = require('fs');
const Discord = require('discord.js');

// VARIABLE IMPORTS
const { client } = require('../constants.js');
const CONFIG = require('../config.js');

// OTHER IMPORTS
const QSTORE = require('../questions.json'); // Bringing in the Questions & Answers

const HOUSESCORES = require('../houseScores.json');
const PLAYERSCORES = require('../playerScores.json');
const TEMPSCORES = require('../roundScores.json');
const EMPTYSCORES = require('../templates/templateJSON.json');
let questionInterval;
let delay = 50000;

// THIS MODULE
module.exports = {
    name: "triviaModule",


    /**
     * Handles the main functions of Trivia Rounds
     * 
     * @param {Discord.Message} message 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async Main(message) {

        // Fetch stuff needed
        const triviaChannel = message.channel;


        // Send starting message
        let embed = new Discord.MessageEmbed().setColor('#008bb5')
        .setTitle(`New Trivia Round!`)
        .setDescription(`A new Trivia Round is about to start!
        
        You will have 20 seconds per question to answer them correctly.
        The first 10 correct answers score points, the quicker you are, the more points you earn!
        
        Answers are case-insensitive, so don't worry about UPPERCASE letters!`)
        .addFields(
            {
                name: `Round Host`,
                value: message.member.displayName,
                inline: true
            },
            {
                name: `Total Questions`,
                value: CONFIG.QUESTION_AMOUNT,
                inline: true
            }
        );

        await triviaChannel.send(embed);

        delete embed; // Free up cache



        // QUESTIONS!
        let currentQuestion = 1;
        delay = 50000;


        // First question
        setTimeout(async () => {
            await this.AskQuestion(triviaChannel, currentQuestion);
            currentQuestion += 1;
        }, 20000);


        // Rest of the questions
        questionInterval = setTimeout(async function QuestionLoop() {

            // DO NOT REMOVE - otherwise everything breaks!
            // Yes, I know importing something inside of itself shouldn't be, but it doesn't work otherwise without this!
            const Trivia = client.modules.get("triviaModule");

            if ( currentQuestion >= ( CONFIG.QUESTION_AMOUNT + 1 ) ) {
    
                await Trivia.Results(triviaChannel);
                clearTimeout(questionInterval);
                return;
    
            }
            else if ( currentQuestion === 2 ) {
    
                delay = 30000;
                await Trivia.AskQuestion(triviaChannel, currentQuestion);
                currentQuestion += 1;
                questionInterval = setTimeout(QuestionLoop, delay);
    
            }
            else {
    
                await Trivia.AskQuestion(triviaChannel, currentQuestion);
                currentQuestion += 1;
                questionInterval = setTimeout(QuestionLoop, delay);
    
            }
    
        }, delay);

    },
    



























    /**
     * Posts Results of that Round
     * 
     * @param {Discord.TextChannel} channel 
     * 
     * @returns {Promise<Discord.Message>} wrapped Message
     */
    async Results(channel) {

        // MODULE IMPORTS
        const Errors = client.modules.get("errorLogger");






        // Collect results
        let tempScoresObject = Object.values(TEMPSCORES);
        
        // bubble-sort scores from that round
        let sorted;

        do {

            sorted = false;

            for ( let i = 0; i < tempScoresObject.length - 1; i++ ) {
                
                if ( tempScoresObject[i].score < tempScoresObject[i + 1].score ) {
                    let temp = tempScoresObject[i];
                    tempScoresObject[i] = tempScoresObject[i + 1];
                    tempScoresObject[i + 1] = temp;

                    sorted = true;
                }

            }

        } while (sorted === true);



        let roundResultsArray = [];

        if ( tempScoresObject.length < 10 ) {

            for ( let i = 0; i < tempScoresObject.length; i++ ) {
                const houseEmoji = tempScoresObject[i].houseName === "Snowman" ? "⛄" : tempScoresObject[i].houseName === "Elves" ? "🧝" : tempScoresObject[i].houseName === "Penguins" ? "🐧" : tempScoresObject[i].houseName === "Santa" ? "🎅" : tempScoresObject[i].houseName === "Reindeer" ? "🦌" : tempScoresObject[i].houseName === "Snowflake" ? "❄️" : "<:Grinch:783694623716802561>";
                roundResultsArray.push(`${i + 1}) ${houseEmoji} **${tempScoresObject[i].username}**  -  ${tempScoresObject[i].score} points earnt`);
            }

        }
        else {

            for ( let i = 0; i < 10; i++ ) {
                const houseEmoji = tempScoresObject[i].houseName === "Snowman" ? "⛄" : tempScoresObject[i].houseName === "Elves" ? "🧝" : tempScoresObject[i].houseName === "Penguins" ? "🐧" : tempScoresObject[i].houseName === "Santa" ? "🎅" : tempScoresObject[i].houseName === "Reindeer" ? "🦌" : tempScoresObject[i].houseName === "Snowflake" ? "❄️" : "<:Grinch:783694623716802561>";
                roundResultsArray.push(`${i + 1}) ${houseEmoji} **${tempScoresObject[i].username}**  -  ${tempScoresObject[i].score} points earnt`);
            }

        }





        // Now for the updated House rankings
        let tempHouses = Object.values(HOUSESCORES);
        let houseSorted;

        do {

            houseSorted = false;

            for ( let i = 0; i < tempHouses.length - 1; i++ ) {

                if ( tempHouses[i].score < tempHouses[i + 1].score ) {
                    let temp = tempHouses[i];
                    tempHouses[i] = tempHouses[i + 1];
                    tempHouses[i + 1] = temp;

                    houseSorted = true;
                }

            }

        } while (houseSorted === true);


        let houseArray = [];
        for ( let i = 0; i < tempHouses.length; i++ ) {
            const houseEmoji = tempHouses[i].name === "Snowman" ? "⛄" : tempHouses[i].name === "Elves" ? "🧝" : tempHouses[i].name === "Penguins" ? "🐧" : tempHouses[i].name === "Santa" ? "🎅" : tempHouses[i].name === "Reindeer" ? "🦌" : tempHouses[i].name === "Snowflake" ? "❄️" : "<:Grinch:783694623716802561>";
            houseArray.push(`${i + 1}) ${houseEmoji} **${tempHouses[i].name}**  -  ${tempHouses[i].score} total points`);
        }







        // SEND
        let playerEmbed = new Discord.MessageEmbed().setColor('GOLD')
        .setTitle(`Player Results of this Round`)
        .setDescription(`${roundResultsArray.join(`\n`)}`);

        let houseEmbed = new Discord.MessageEmbed().setColor('GOLD')
        .setTitle(`Updated House Rankings`)
        .setDescription(`${houseArray.join(`\n`)}`);


        await channel.send(playerEmbed);
        await channel.send(houseEmbed);


        // free up cache
        delete playerEmbed;
        delete houseEmbed;




        // Clear roundScores.json so that it is ready for the next round
        fs.writeFile('./roundScores.json', JSON.stringify(EMPTYSCORES, null, 4), async (err) => {
            if (err) {
                await Errors.LogCustom(err, `ERROR while trying to SAVE EMPTYSCORES to roundScores.json`);
            }
        });


        return;

    },




























    /**
     * Handles asking of and listening for Answers
     * 
     * @param {Discord.TextChannel} channel 
     */
    async AskQuestion(channel, currentNumber) {

        // MODULE IMPORTS
        const Errors = client.modules.get("errorLogger");










        const userAnswers = [];

        // Temp copy QUESTIONS into this Object so I can fetch its size
        let qtemp = Object.values(QSTORE);


        // Select a random question
        let questionNumber = Math.floor( ( Math.random() * qtemp.length ) + 1 );
        let chosenQuestion = QSTORE[`${questionNumber}`].question;
        let questionAnswers = QSTORE[`${questionNumber}`].answers;

        

        // Send Question
        let embed = new Discord.MessageEmbed().setColor('#75ebeb')
        .setTitle(`Question ${currentNumber}`)
        .setDescription(`${chosenQuestion}`);

        await channel.send(embed);
        delete embed; // free up cache


        // Filter for Message Collector
        const filter = m => {
            let isAnswerCorrect = false;

            for ( let i = 0; i < questionAnswers.length; i++ ) {
                if ( m.content.toLowerCase().includes(questionAnswers[i]) ) {
                    isAnswerCorrect = true;
                    break;
                }
            }

            return isAnswerCorrect && !m.member.roles.cache.has(CONFIG.STAFFID);
        }



        // Begin listening for the correct answer
        const collector = channel.createMessageCollector(filter, { time: 20000, max: 10 });
        collector.on('collect', (message) => {

            if ( userAnswers.length === 10 ) {
                return;
            }
            else {
                userAnswers.push(message.author.id);
                return;
            }

        });

        collector.on('end', async (collected, reason) => {

            // Time is up! Check Array
            let embed = new Discord.MessageEmbed().setColor('#008bb5')
            .setTitle(`⌛ Time's up!`);

            let messageArray = [];

            for ( let i = 0; i < userAnswers.length; i++ ) {

                let tempMember = await channel.guild.members.fetch(userAnswers[i]);
                
                // Add to scores stores
                if ( !TEMPSCORES[tempMember.user.id] ) {
                    TEMPSCORES[tempMember.user.id] = {
                        username: tempMember.user.username,
                        id: tempMember.user.id,
                        houseName: tempMember.roles.cache.has(CONFIG.SNOWMANID) ? "Snowman" : tempMember.roles.cache.has(CONFIG.ELVESID) ? "Elves" : tempMember.roles.cache.has(CONFIG.PENGUINSID) ? "Penguins" : tempMember.roles.cache.has(CONFIG.SANTAID) ? "Santa" : tempMember.roles.cache.has(CONFIG.REINDEERID) ? "Reindeer" : tempMember.roles.cache.has(CONFIG.SNOWFLAKEID) ? "Snowflake" : tempMember.roles.cache.has(CONFIG.GRINCHID) ? "Grinch" : "NULL",
                        score: 0
                    }
                }


                if ( !PLAYERSCORES[tempMember.user.id] ) {
                    PLAYERSCORES[tempMember.user.id] = {
                        username: tempMember.user.username,
                        id: tempMember.user.id,
                        houseName: tempMember.roles.cache.has(CONFIG.SNOWMANID) ? "Snowman" : tempMember.roles.cache.has(CONFIG.ELVESID) ? "Elves" : tempMember.roles.cache.has(CONFIG.PENGUINSID) ? "Penguins" : tempMember.roles.cache.has(CONFIG.SANTAID) ? "Santa" : tempMember.roles.cache.has(CONFIG.REINDEERID) ? "Reindeer" : tempMember.roles.cache.has(CONFIG.SNOWFLAKEID) ? "Snowflake" : tempMember.roles.cache.has(CONFIG.GRINCHID) ? "Grinch" : "NULL",
                        score: 0
                    }
                }






                TEMPSCORES[tempMember.user.id].score += CONFIG.POINTS_AWARDED[i];
                PLAYERSCORES[tempMember.user.id].score += CONFIG.POINTS_AWARDED[i];


                let playersHouse = PLAYERSCORES[tempMember.user.id].houseName;
                HOUSESCORES[`${playersHouse}`].score += CONFIG.POINTS_AWARDED[i];



                // Save new rankings to JSONs
                fs.writeFile('./houseScores.json', JSON.stringify(HOUSESCORES, null, 4), async (err) => {
                    if (err) {
                        await Errors.LogCustom(err, `ERROR while trying to SAVE HOUSESCORES to houseScores.json`);
                    }
                });

                fs.writeFile('./playerScores.json', JSON.stringify(PLAYERSCORES, null, 4), async (err) => {
                    if (err) {
                        await Errors.LogCustom(err, `ERROR while trying to SAVE PLAYERSCORES to playerScores.json`);
                    }
                });

                fs.writeFile('./roundScores.json', JSON.stringify(TEMPSCORES, null, 4), async (err) => {
                    if (err) {
                        await Errors.LogCustom(err, `ERROR while trying to SAVE TEMPSCORES to roundScores.json`);
                    }
                });


                messageArray.push(`${i + 1})  ${tempMember.user.username}`);

            }


            // Embed
            embed.setDescription(`The quickest 10 peeps to answer Question ${currentNumber} first were:
            
            ${messageArray.join(`\n`)}
            
            ${currentNumber + 1 === CONFIG.QUESTION_AMOUNT ? "Last Question in 10 seconds..." : currentNumber === CONFIG.QUESTION_AMOUNT ? "Round is over! Results in 10 seconds..." : "Next Question in 10 seconds..."}`);

            await channel.send(embed);
            delete embed; // free up cache
            

        });

    }

};
