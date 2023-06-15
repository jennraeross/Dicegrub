const { SlashCommandBuilder, strikethrough } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('attack')
		.setDescription('Make an attack roll')
        .addIntegerOption(option =>
            option.setName('attackbonus')
                .setDescription('The inherent bonus you have for attack rolls')
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
        const atk = interaction.options.getInteger('attackbonus') ?? 0;
		const edge = interaction.options.getBoolean('edge') ?? false;
		const snag = interaction.options.getBoolean('snag') ?? false;
		const bonus = interaction.options.getInteger('bonus') ?? false;
		const penalty = interaction.options.getInteger('penalty') ?? false;
		let roll = Math.floor(Math.random() * 20) + 1;
		let edgeRoll = Math.floor(Math.random() * 20) + 1;
		let snagRoll = Math.floor(Math.random() * 20) + 1;
		if (bonus || penalty) {
			if (!penalty) var calc = bonus;
			else if (!bonus) var calc =  0 - penalty;
			else var calc = bonus - penalty;
			if (edge && !snag) {
				if (edgeRoll > roll) await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ' -- Total: ' + (edgeRoll + calc + atk));
				else if (roll > edgeRoll) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ' -- Total: ' + (roll + calc + atk));
			}
			else if (snag && !edge) {
				if (snagRoll < roll) await interaction.reply('You rolled : ' + strikethrough(roll) + ' ' + snagRoll + ' -- Total: ' + (snagRoll + calc + atk));
				else if (roll < snagRoll) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(snagRoll) + ' -- Total: ' + (roll + calc + atk));
			}
			else await interaction.reply('You rolled a ' + roll + ' -- Total: ' + (roll + atk));
		}
		if (edge && !snag) {
			if (edgeRoll > roll) await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ' -- Total: ' + (edgeRoll + atk));
			else if (roll > edgeRoll) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ' -- Total: ' + (roll + atk));
		}
		else if (snag && !edge) {
			if (snagRoll < roll) await interaction.reply('You rolled a ' + strikethrough(roll) + ' ' + snagRoll + ' -- Total: ' + (snagRoll + atk));
			else if (roll < snagRoll) await interaction.reply('You rolled a ' + roll + ' ' + strikethrough(snagRoll) + ' -- Total: ' + (roll + atk));
		}
		else await interaction.reply('You rolled a ' + roll + ' -- Total: ' + (roll + atk));
	},
};