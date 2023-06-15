const { SlashCommandBuilder, strikethrough } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Roll up a random character!'),
	async execute(interaction) {
		var callingRoll = Math.floor(Math.random() * 20) + 1
        var speciesRoll = Math.floor(Math.random() * 20) + 1
        var homelandRoll = Math.floor(Math.random() * 20) + 1
        var historyRoll = Math.floor(Math.random() * 20) + 1
        var quirkroll = Math.floor(Math.random() * 3) + 1
        var bioquirkroll = Math.floor(Math.random() * 2) + 1
        var graftroll = Math.floor(Math.random() * 3) + 1

        var calling
        var species
        var homeland
        var history
        var quirk
		
        switch (callingRoll) {
            case 1:
            case 2:
            case 3:
                calling = 'Factotum'
                break
            case 4:
            case 5:
            case 6:
                calling = 'Sneak'
                break
            case 7:
            case 8:
            case 9:
                calling = 'Champion'
                break
            case 10:
            case 11:
            case 12: 
                calling = 'Raider'
                break
            case 13:
            case 14:
                calling = 'Battle Princess'
                break
            case 15:
            case 16:
                calling = 'Murder Princess'
                break
            case 17:
            case 18:
                calling = 'Sage'
                break;
            case 19:
            case 20:
                calling = 'Heretic'
                break
        }
		
        switch(speciesRoll) {
            case 1:
            case 2:
            case 3:
            case 4:
                species = 'Native Human'
                break
            case 5:
                species = 'Dimensional Stray'
                break
            case 6:
            case 7:
                species = 'Chib'
            case 8:
            case 9:
            case 10:
                species = 'Tenebrate'
                break
            case 11:
            case 12:
            case 13:
                species = 'Rai-Neko'
                break
            case 14:
            case 15:
                species = 'Promethean'
                break
            case 16:
                species = 'Gruun'
                break
            case 17:
                species = 'Goblin'
                break
            case 18:
                species = 'Dwarf'
                break
            case 19:
                species = 'Elf'
                break
            case 20:
                species = 'Bio-Mechanoid'
                break
        }

        switch (homelandRoll) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                homeland = 'Wistful Dark'
                break
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                homeland = 'Twilight Meridian'
                break
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                homeland = 'Blazing Garden'
                break
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
                homeland = 'Buried Kingdoms'
                break
        }

        if (species == 'Dimensional Stray') {
            homeland = 'Other World'
        }

        if (homeland == 'Wistful Dark') {
            switch (historyRoll) {
                case 1:
                case 2: 
                    history = 'Forsaken Wanderer'
                    break
                case 3:
                case 4:
                    history = 'Blight Raider'
                    break
                case 5:
                case 6:
                    history = 'Shadow Lands Nomad'
                    break
                case 7:
                case 8:
                    history = 'Murk Dweller'
                    break
                case 9: 
                case 10:
                    history = 'Nightwall Yeoman'
                    break
                case 11:
                case 12:
                    history = 'Starlight Farmer'
                    break
                case 13:
                case 14:
                    history = 'Guild Agent'
                    break
                case 15: 
                case 16:
                    history = 'Town Guard'
                    break
                case 17:
                    history = 'Celebrated Artist'
                    break
                case 18:
                    history = 'Magia University Graduate'
                    break
                case 19:
                    history = 'Knight Errant'
                    break
                case 20:
                    history = 'Shard State Patrician'
                    break
            }
        }

        if (homeland == 'Twilight Meridian') {
            switch (historyRoll) {
                case 1:
                case 2: 
                    history = 'Disgraced Scion'
                    break
                case 3:
                case 4:
                    history = 'Shadow Sea Pirate'
                    break
                case 5:
                case 6:
                    history = 'Orphaned Shinobi'
                    break
                case 7:
                case 8:
                    history = 'Oldtech Junker'
                    break
                case 9: 
                case 10:
                    history = 'Twilight Silk Tailor'
                    break
                case 11:
                case 12:
                    history = 'Medicine Peddler'
                    break
                case 13:
                case 14:
                    history = 'Shining Sea Fisherman'
                    break
                case 15: 
                case 16:
                    history = 'Portian University Graduate'
                    break
                case 17:
                    history = 'Merchant Scion'
                    break
                case 18:
                    history = 'Holy Isle Samurai'
                    break
                case 19:
                    history = 'Archive Researcher'
                    break
                case 20:
                    history = 'Black Glove Cavalier'
                    break
            }
        }

        if (homeland == 'Blazing Garden') {
            switch (historyRoll) {
                case 1:
                case 2: 
                    history = 'Kinless Vagrant'
                    break
                case 3:
                case 4:
                    history = 'Monster Slayer'
                    break
                case 5:
                case 6:
                    history = 'Street Rat'
                    break
                case 7:
                case 8:
                    history = 'Thunda Clan Barbarian'
                    break
                case 9: 
                case 10:
                    history = 'Beast Handler'
                    break
                case 11:
                case 12:
                    history = 'Village Runner'
                    break
                case 13:
                case 14:
                    history = 'Jubilant Performer'
                    break
                case 15: 
                case 16:
                    history = 'City Scrivener'
                    break
                case 17:
                    history = 'Emissary of Sol'
                    break
                case 18:
                    history = 'Wyrm Blooded'
                    break
                case 19:
                    history = 'Hinterland Noble'
                    break
                case 20:
                    history = 'Startech Adept'
                    break
            }
        }

        if (homeland == 'Buried Kingdoms') {
            switch (historyRoll) {
                case 1:
                case 2: 
                    history = 'Tunnel Crawler'
                    break
                case 3:
                case 4:
                    history = 'Ruin Scavenger'
                    break
                case 5:
                case 6:
                    history = 'War Deserter'
                    break
                case 7:
                case 8:
                    history = 'Moss Scraper'
                    break
                case 9: 
                case 10:
                    history = 'Underland Soldier'
                    break
                case 11:
                case 12:
                    history = 'Honored Laborer'
                    break
                case 13:
                case 14:
                    history = 'Forge Hand'
                    break
                case 15: 
                case 16:
                    history = 'Field Sapper'
                    break
                case 17:
                    history = 'Record Etcher'
                    break
                case 18:
                    history = 'Comrade Agitator'
                    break
                case 19:
                    history = 'Resolute Overseer'
                    break
                case 20:
                    history = 'Apprentice Thinker'
                    break
            }
        }

        if (homeland == 'Other World') {
            switch (historyRoll) {
                case 1:
                case 2: 
                    history = 'Transient'
                    break
                case 3:
                case 4:
                    history = 'NEET'
                    break
                case 5:
                case 6:
                    history = 'Retail / Service'
                    break
                case 7:
                case 8:
                    history = 'Blue Collar'
                    break
                case 9: 
                case 10:
                    history = 'White Collar'
                    break
                case 11:
                case 12:
                    history = 'Domestic'
                    break
                case 13:
                case 14:
                    history = 'Military / Law Enforcement'
                    break
                case 15: 
                case 16:
                    history = 'Education, Faculty'
                    break
                case 17:
                case 18:
                case 19:
                    history = 'Education, Student'
                    break
                case 20:
                    history = 'Idle Rich'
                    break
            }
        }

        function rollSpirit() {
            let roll = Math.floor(Math.random() * 20) + 1
            switch (roll) {
                case 1:
                case 2:
                    quirk = 'Unhinged'
                    break
                case 3:
                case 4:
                    quirk = 'Jumpy'
                    break
                case 5:
                case 6:
                    quirk = 'Pedantic'
                    break
                case 7:
                case 8:
                    quirk = 'Clear Intent'
                    break
                case 9:
                case 10:
                    quirk = 'Boring'
                    break
                case 11:
                case 12:
                    quirk = 'Curious'
                    break
                case 13:
                case 14:
                    quirk = 'Always Prepared'
                    break
                case 15: 
                case 16:
                    quirk = 'Stylish'
                    break
                case 17: 
                case 18:
                    quirk = 'Miser'
                    break
                case 19: 
                case 20:
                    quirk = 'Soul Link'
            }
        }

        function rollPhysiology() {
            let roll = Math.floor(Math.random() * 20) + 1
            switch (roll) {
                case 1:
                case 2:
                    quirk = 'Girthsome'
                    break
                case 3:
                case 4:
                    quirk = 'Nearsighted'
                    break
                case 5:
                case 6:
                    quirk = 'Adorable'
                    break
                case 7:
                case 8:
                    quirk = 'Dark Demeanor'
                    break
                case 9:
                case 10:
                    quirk = 'Angelic Countenance'
                    break
                case 11:
                case 12:
                    quirk = 'Big Eater'
                    break
                case 13:
                case 14:
                    quirk = 'Waifish'
                    break
                case 15: 
                case 16:
                    switch (graftroll) {
                        case 1:
                            quirk = 'Magitech Graft - Utility Servo'
                            break
                        case 2:
                            quirk = 'Magitech Graft - Sproing Sprockets'
                            break
                        case 3:
                            quirk = 'Magitech Graft - Nox-Vision'
                            break
                    }
                    break
                case 17: 
                case 18:
                    quirk = 'Winged'
                    break
                case 19: 
                case 20:
                    quirk = 'Grasping Tresses'
            }
        }

        function rollFate() {
            let roll = Math.floor(Math.random() * 20) + 1
            switch (roll) {
                case 1:
                case 2:
                    quirk = 'Survivor'
                    break
                case 3:
                case 4:
                    quirk = 'Mage Breaker'
                    break
                case 5:
                case 6:
                    quirk = 'Young'
                    break
                case 7:
                case 8:
                    quirk = 'Past Injury'
                    break
                case 9:
                    quirk = 'Weary - Scarred Soul'
                    break
                case 10:
                    quirk = 'Weary - Walker of two Paths'
                    break
                case 11:
                case 12:
                    quirk = 'Destined'
                    break
                case 13:
                case 14:
                    quirk = 'Dread Orator'
                    break
                case 15: 
                case 16:
                    quirk = 'Beast Tongue'
                    break
                case 17: 
                case 18:
                    quirk = 'Guardian'
                    break
                case 19: 
                case 20:
                    quirk = 'Crowned'
            }
        }

        function rollEldritch() {
            let roll = Math.floor(Math.random() * 20) + 1
            switch (roll) {
                case 1:
                case 2:
                    quirk = 'Dreamer'
                    break
                case 3:
                case 4:
                    quirk = 'Lyrical'
                    break
                case 5:
                case 6:
                    quirk = 'Infested'
                    break
                case 7:
                case 8:
                    quirk = 'Peculiar Taste'
                    break
                case 9:
                case 10:
                    quirk = 'Kin to Fire'
                    break
                case 11:
                case 12:
                    quirk = 'Fairy Cap'
                    break
                case 13:
                case 14:
                    quirk = 'Sneezles'
                    break
                case 15: 
                case 16:
                    quirk = 'Masked'
                    break
                case 17: 
                case 18:
                    quirk = 'Ferrous'
                    break
                case 19: 
                case 20:
                    quirk = 'Figment Follower'
            }
        }

        function rollRobotic() {
            let roll = Math.floor(Math.random() * 20) + 1
            switch (roll) {
                case 1:
                case 2:
                    quirk = 'Industial Frame'
                    break
                case 3:
                case 4:
                    quirk = 'Utility Servo'
                    break
                case 5:
                case 6:
                    quirk = 'Sproing Sprockets'
                    break
                case 7:
                case 8:
                    quirk = 'Translator Module'
                    break
                case 9:
                case 10:
                    quirk = 'Battle Scanner'
                    break
                case 11:
                case 12:
                    quirk = 'Buster Arm'
                    break
                case 13:
                case 14:
                    quirk = 'Mascot Chassis'
                    break
                case 15: 
                case 16:
                    quirk = 'Nanotech Maintenance'
                    break
                case 17: 
                case 18:
                    quirk = 'Bioskin'
                    break
                case 19: 
                case 20:
                    quirk = 'Nox-Vision'
            }
        }

        switch (species) {
            case 'Native Human':
            case 'Dimensional Stray': 
            case 'Gruun':
            case 'Chib': 
            case 'Promethean': 
            case 'Rai-Neko': 
            case 'Tenebrate':
                switch (quirkroll) {
                    case 1:
                        rollSpirit()
                        break
                    case 2:
                        rollPhysiology()
                        break
                    case 3:
                        rollFate()
                        break
                }
                break
            case 'Dwarf': 
            case 'Elf': 
            case 'Goblin':
                switch (quirkroll) {
                    case 1:
                        rollSpirit()
                        break
                    case 2:
                        rollPhysiology()
                        break
                    case 3:
                        rollEldritch()
                        break
                }
                break
            case 'Bio-Mechanoid':
                switch (bioquirkroll) {
                    case 1:
                        rollSpirit()
                        break
                    case 2:
                        rollRobotic()
                        break
                }
                break
        }

        //*#############
        //* Output Result

        await interaction.reply(`
You are a ${species} ${calling}.
You hail from the ${homeland} with the ${history} history.
Your quirk is "${quirk}".
You have ${Math.floor(Math.random() * 20) + 1} gold.
        `)
	},
};