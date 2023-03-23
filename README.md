# Trivia Bot
*I couldn't think of a better name...*

# THE LICENSE
The License for this Project, and all of TwilightZebby's Projects, can be [found here](https://github.com/TwilightZebby/license/blob/main/license.md).

---

## Information

This is just a small little Trivia Bot made by TwilightZebby for use on Dr1fterX's [Discord Server](https://discord.gg/URH5E34FZf). (He's a [twitch streamer](https://twitch.tv/Dr1fterX))

Every December, he sets up about 7 Winter Houses (Roles) that we can self-assign for a little fun. I thought that this year (2020) we could have an inter-House competition. This is where this Discord Bot comes in!

The Bot's Trivia Rounds works as so:

* Once a round starts (triggered using a command by that round's host), a series of random questions are given to the Users in a special Text Channel.
* Each question is given one at a time, with about 20 seconds given to try and answer it correctly.
* Users earn points for answering questions correctly.
* *However,* only the first ten (10) to answer correctly gets points. The quicker you are of those 10, the more points you earn!

Additionally, the Bot will also know which Winter House/Role that User is in, and keep a running total of *all* the points that House has - meaning that there are two leaderboards! Once for the Top 10 Users, and another for the Houses.

---

### Can I invite this Bot to my own Server?
> Nope. Sorry!
> 
> I made this Bot for use in Dr1fterX's Discord only. Also, I won't be keeping this Bot online 24/7 - only while we require the use of it :)


### Why is there not a Help Command / Why was the Help Command removed?
> Because Discord recently released their custom [Slash Command API](https://discord.com/developers/docs/interactions/slash-commands), and since you can also have command descriptions on those, I decided to use that and remove the Help Command since it's no longer needed


### What are the Register/Deregister Commands for?
> They still use the Bot's `t?` prefix since they wouldn't work as a Slash Command (see above).
> 
> The `register` command is for registering this Bot's Slash Commands onto the Guild the CMD is used in.
> The `deregister` command does the reverse, it removes those registered Slash Commands from the Guild.
>
> I decided to use [Guild Slash Commands](https://discord.com/developers/docs/interactions/slash-commands#registering-a-command) instead of Global Slash Commands because then I could 'hide' the Bot when we are not using it for Speed-Trivia Rounds (since Guild Slash Commands update almost instantly; while Global Commands update within 1 hour)
