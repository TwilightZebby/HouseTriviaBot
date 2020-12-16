// LIBRARIES
const fs = require('fs');
const Discord = require('discord.js');



// GLOBAL STUFF
const { client } = require('./constants.js');
const { PREFIX, TOKEN } = require('./config.js');



// MAPS AND COLLECTIONS
client.commands = new Discord.Collection();
client.modules = new Discord.Collection();
client.cooldowns = new Discord.Collection();



// BRING IN COMMAND FILES
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // All Commands



// ADD COMMAND FILES TO COLLECTION
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


// BRING IN MODULES
const moduleFiles = fs.readdirSync('./bot_modules').filter(file => file.endsWith('.js'));

// ADD MODULE FILES TO COLLECTION
for (const file of moduleFiles) {
    const module = require(`./bot_modules/${file}`);
    client.modules.set(module.name, module);
}



































// DEBUGGING AND ERROR HANDLING
const Errors = client.modules.get("errorLogger");


// Warnings
process.on('warning', async (warning) => {

    // Log to console
    console.warn(warning);
  
    // Log to error log channel
    let errorChannel = await client.guilds.fetch('720258928470130760');
    errorChannel = errorChannel.channels.resolve('784126973005791232');
  
    return await errorChannel.send(`\`\`\`Warning:\n
    ${warning}
    \`\`\``);
  
});
  
// Unhandled Promise Rejections
process.on('unhandledRejection', async (error) => {
    
    return await Errors.LogCustom(error, `Unhandled Promise Rejection:`)
  
});
  
  
 
  
  
// Discord Error Handling
client.on('error', async (error) => {
    
    return await Errors.LogCustom(error, `Discord Error:`);
  
});
  
  
// Discord RateLimit Errors
client.on('rateLimit', async (rateLimitInfo) => {
  
    // Log to Console
    console.warn(rateLimitInfo);
  
    // Log to error log channel
    let errorChannel = await client.guilds.fetch('720258928470130760');
    errorChannel = errorChannel.channels.resolve('784126973005791232');
  
    return await errorChannel.send(`\`\`\`Discord Ratelimit Error:\n
    Timeout (ms): ${rateLimitInfo.timeout}
    Limit: ${rateLimitInfo.limit}
    Method: ${rateLimitInfo.method}
    Path: ${rateLimitInfo.path}
    Route: ${rateLimitInfo.route}
    \`\`\``);
  
});
  
  
// Discord API Warnings
client.on('warn', async (warning) => {
  
    // Log to console
    console.warn(warning);
  
    // Log to error log channel
    let errorChannel = await client.guilds.fetch('720258928470130760');
    errorChannel = errorChannel.channels.resolve('784126973005791232');
  
    return await errorChannel.send(`\`\`\`Discord Warning:\n
    ${warning}
    \`\`\``);
  
});



































// DISCORD API READY EVENT
// - Bot Status
client.once('ready', async () => {

    await client.user.setPresence( { activity: { name: `peeps playing Trivia!`, type: 'WATCHING' }, status: 'online' } );

    // To refresh the Status
    client.setInterval(async function(){
        await client.user.setPresence( { activity: { name: `peeps playing Trivia!`, type: 'WATCHING' }, status: 'online' } );
    }, 1.08e+7);

    console.log("I am ready!");

});































// Bring in Module
const SlashCommands = client.modules.get("slashModule");

client.on('raw', async (evt) => {

    if (evt.t !== 'INTERACTION_CREATE') {
        return;
    }

    const {d: data} = evt;


    if (data.type !== 2) {
        return;
    }


    const CommandData = data.data;

    // Fetch Guild
    const authorGuild = await client.guilds.fetch(data["guild_id"]);


    switch (CommandData.name) {

        case "ping":
            const PingCommand = client.commands.get("ping");
            return await PingCommand.execute(authorGuild, data, CommandData);



        case "info":
            const InfoCommand = client.commands.get("info");
            return await InfoCommand.execute(authorGuild, data, CommandData);



        case "top":
            const TopCommand = client.commands.get("top");
            return await TopCommand.execute(authorGuild, data, CommandData);



        case "start":
            const StartCommand = client.commands.get("start");
            return await StartCommand.execute(authorGuild, data, CommandData);



        default:
            return;

    }

});










































// DISCORD MESSAGE POSTED EVENT
// - Commands
client.on('message', async message => {

    // Just to prevent Discord Outages crashing the Bot
    if ( !message.guild.available ) {
        return;
    }













    // Was message sent in DMs
    if ( message.channel instanceof Discord.DMChannel ) {
        return;
    }












    // Checks to prevent usage by other Bots, or SYSTEM stuff
    if ( message.author.bot || message.author.flags.has('SYSTEM') || message.system ) {
        return;
    }



















    // PREFIX CHECK
    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);



    if ( !prefixRegex.test(message.content) ) {
        // No PREFIX found in message, do nothing
        return;
    }
    else {

        // PREFIX found, attempt command!

        // Slice PREFIX and fetch Command
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) {
            return;
        }





        // Check to make sure Command is NOT a Slash Command
        const regularCommands = [ "register", "deregister" ];
        if ( !regularCommands.includes(command.name) )
        {
            return;
        }



























        // COMMAND LIMITATIONS
        if ( command.limitation ) {

            switch(command.limitation) {

                case 'twilightzebby':
                    if ( message.author.id !== "156482326887530498" ) {
                        return await message.channel.send(`${message.member.displayName} sorry, but this command can only be used by TwilightZebby!`);
                    }
                    break;


                // Just in case
                default:
                    break;

            }

        }












































        // COMMAND COOLDOWNS
        if ( !client.cooldowns.has(command.name) ) {
            client.cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;




        // OVERRIDE COOLDOWN IF MISSING ARGUMENTS
        if ( command.args && !args.length ) {

            let reply = `${message.member.displayName}, you didn't provide any arguments!`;
            if ( command.usage ) {
                reply += `\n> The proper usage would be: \`${PREFIX}${command.name} ${command.usage[0]}\``;
            }

            if ( timestamps.has(message.author.id) === false ) {
                cooldownAmount = 1000;
            }

            return await message.channel.send(reply);

        }









        // HANDLE COOLDOWNS
        if ( timestamps.has(message.author.id) ) {

            if ( message.author.id === "156482326887530498" && message.content.includes("--overridecooldown") ) {
                timestamps.delete(message.author.id);
            }
            else {

                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if ( now < expirationTime ) {

                    let timeLeft = (expirationTime - now) / 1000;

                    // If greater than 60 Seconds, convert into Minutes
                    if (timeLeft >= 60 && timeLeft < 3600) {
                        timeLeft = timeLeft / 60;
                        return await message.channel.send(`${message.member.displayName} Please wait ${timeLeft.toFixed(1)} more minute(s) before reusing the \`${command.name}\` command.`);
                    }
                    // If greater than 3600 Seconds, convert into Hours
                    else if (timeLeft >= 3600) {
                        timeLeft = timeLeft / 3600;
                        return await message.channel.send(`${message.member.displayName} Please wait ${timeLeft.toFixed(1)} more hour(s) before reusing the \`${command.name}\` command.`);
                    }
  
                    return await message.channel.send(`${message.member.displayName} Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);

                }

            }

        }
        else if ( message.author.id === "156482326887530498" && message.content.includes("--overridecooldown") ) {
            // Developer override of cooldown, do NOTHING
        }
        else {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }














        // Catch for above for when Command expects Arguments but doesn't get any
        if ( command.args && !args.length ) {
            return;
        }













        // EXECUTE COMMAND
        try {
            await command.execute(message, args);
        } catch (err) {
            await Errors.LogCustom(err, `(**index.js** - EXECUTE COMMAND FAIL)`);
            return await message.channel.send(`Sorry ${message.member.displayName} - there was an error trying to run that command!`);
        }

    }

});



client.login(TOKEN);
