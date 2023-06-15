const { SlashCommandBuilder, strikethrough } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Check to see if you succeed at a task')
        .addIntegerOption(option =>
            option.setName('target')
                .setDescription('The number you intend to roll under')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('edge')
                .setDescription('Whether you have an edge on the roll.'))
        .addBooleanOption(option =>
            option.setName('snag')
                .setDescription('Whether you have an snag on the roll.'))
        .addIntegerOption(option =>
            option.setName('bonus')
                .setDescription('Add a Bonus to your roll (Minor Bonus: 2, Major Bonus: 4)'))
        .addIntegerOption(option =>
            option.setName('penalty')
                .setDescription('Subtract a Penalty from your roll (Minor Penalty: 2, Major Penalty: 4)')),
	async execute(interaction) {
        const target = interaction.options.getInteger('target');
        const edge = interaction.options.getBoolean('edge') ?? false;
		const snag = interaction.options.getBoolean('snag') ?? false;
        var bonus = interaction.options.getInteger('bonus') ?? false;
		var penalty = interaction.options.getInteger('penalty') ?? false;
		let roll = Math.floor(Math.random() * 20) + 1;
		let edgeRoll = Math.floor(Math.random() * 20) + 1;
        if (bonus && penalty) {
            if (bonus == penalty) { bonus = false; penalty = false; }
            else if (bonus > penalty) { bonus = (bonus - penalty); penalty = false; }
            else if (bonus < penalty) { penalty = (penalty - bonus); bonus = false; }
        }
        if (bonus) {
            if (roll + bonus <= target) var rollTotal = roll + bonus;
            else if (roll - bonus <= target) var rollTotal = roll - bonus;
            else var rollTotal = roll + bonus;
            if (edgeRoll + bonus <= target) var edgeRollTotal = edgeRoll + bonus;
            else if (edgeRoll - bonus <= target) var edgeRollTotal = edgeRoll - bonus;
            else var edgeRollTotal = edgeRoll + bonus;

            if (edge && !snag) {
                if (edgeRollTotal > rollTotal) { 
                    if (edgeRollTotal > target) {
                        if (rollTotal > target) await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!');
                        else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll));
                    } else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll);
                } else if (rollTotal > target) {
                    if (edgeRollTotal > target) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!');
                    else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll);
                } else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll));
            }
            else if (snag && !edge) {
                if (edgeRollTotal < roll) { 
                    if (edgeRollTotal <= target) {
                        if (rollTotal <= target) await interaction.reply('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal);
                        else await interaction.reply('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!');
                    } else await interaction.reply('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!');
                } else if (rollTotal <= target) {
                    if (edgeRollTotal <= target) await interaction.reply('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal));
                    else await interaction.reply('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!');
                } else await interaction.reply('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!');
            }
            else if (rollTotal >= target) await interaction.reply('You rolled a ' + rollTotal + ': That\'s too high!');
            else await interaction.reply('You rolled a ' + rollTotal);



        } else if (penalty) {
            if (roll - penalty > target) var rollTotal = roll - penalty;
            else if (roll + bonus > target) var rollTotal = roll + penalty;
            else var rollTotal = roll - penalty;
            if (edgeRoll - penalty > target) var edgeRollTotal = edgeRoll - penalty;
            else if (edgeRoll + bonus > target) var edgeRollTotal = edgeRoll + penalty;
            else var edgeRollTotal = edgeRoll - penalty;

            if (edge && !snag) {
                if (edgeRollTotal > rollTotal) { 
                    if (edgeRollTotal > target) {
                        if (rollTotal > target) await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!');
                        else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll));
                    } else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll);
                } else if (rollTotal > target) {
                    if (edgeRollTotal > target) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!');
                    else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll);
                } else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll));
            }
            else if (snag && !edge) {
                if (edgeRollTotal < roll) { 
                    if (edgeRollTotal <= target) {
                        if (rollTotal <= target) await interaction.reply('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal);
                        else await interaction.reply('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!');
                    } else await interaction.reply('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!');
                } else if (rollTotal <= target) {
                    if (edgeRollTotal <= target) await interaction.reply('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal));
                    else await interaction.reply('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!');
                } else await interaction.reply('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!');
            }
            else if (rollTotal >= target) await interaction.reply('You rolled a ' + rollTotal + ': That\'s too high!');
            else await interaction.reply('You rolled a ' + rollTotal);
        }


        if (edge && !snag) {
			if (edgeRoll > roll) { 
                if (edgeRoll > target) {
                    if (roll > target) await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!');
                    else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll));
                } else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll);
            } else if (roll > target) {
                if (edgeRoll > target) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!');
                else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll);
            } else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll));
		}
		else if (snag && !edge) {
			if (edgeRoll < roll) { 
                if (edgeRoll <= target) {
                    if (roll <= target) await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll);
                    else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!');
                } else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!');
            } else if (roll <= target) {
                if (edgeRoll <= target) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll));
                else await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!');
            } else await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!');
		}
		else if (roll >= target) await interaction.reply('You rolled a ' + roll + ': That\'s too high!');
		else await interaction.reply('You rolled a ' + roll);
	},
};