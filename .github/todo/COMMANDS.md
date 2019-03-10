# Backlog of commands

\* = Optional parameter.

## Games
| Commands                                  | Description                                              |
|-------------------------------------------|----------------------------------------------------------|
| csgo [steamid]                            | Get stats of any Counter-Strike:Global Offensive player. |
| overwatch [platform] [region] [battletag] | Get stats of any Overwatch player.                       |


## Moderation
| Commands                          | Description                                                        |
|-----------------------------------|--------------------------------------------------------------------|
| report [user] [reason*]           | Report a user to moderation staff.                                 |
| mute [user] [time*] [reason*]     | Mute a user from voice channel.                                    |
| unmute [user]                     | Unmut a user from voice channel.                                   |
| mutelist                          | Lists all voice muted user from your current Discord server.     |
| textmute [user] [time*] [reason*] | Mute a user from text channel.                                     |
| textunmute [user]                 | Unmut a user from text channel.                                    |
| textmutelist                      | Lists all text muted user from your current Discord server.      |
| warn [user] [reason*]             | Give a warning to a user.                                          |
| unwarn [user]                     | Remove a warning from a user.                                      |
| kick [user] [reason*]             | Kick a user from your current Discord server.                      |
| ban [user] [time*] [reason*]      | Bans a user from your current Discord server.                      |
| unban [user]                      | Unbans a user for your current Discord server.                     |
| addrole [user] [role]             | Add a specific role to a user on your current Discord server.      |
| removerole [user] [role]          | Remove a specific role from a user on your current Discord server. |
| removeallroles [user]             | Remove all roles from a user on your current Discord server.       |


## Utilities
| Commands           | Description                       |
|--------------------|-----------------------------------|
| discordtag [user]  | Show the discord tag of the user. |


## Server configuration
| Commands                 | Description                                              |
|--------------------------|----------------------------------------------------------|
| setprefix [prefix]       | Set the prefux used before calling command. (Default: $) |
| enablecommand [command]  | Enable a command on your current Discord server.         |
| disablecommand [command] | Disable a command on your current Discord server.        |