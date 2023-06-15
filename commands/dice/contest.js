const { SlashCommandBuilder, strikethrough } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('contest')
		.setDescription('Make a roll competing with an opponent')

        .addIntegerOption(option =>
            option.setName('aptitude')
                .setDescription('The number you need to roll under')
                .setRequired(true))

        .addIntegerOption(option =>
            option.setName('opposingaptitude')
                .setDescription('The number your opponent needs to roll under')
                .setRequired(true))

        .addBooleanOption(option =>
            option.setName('edge')
                .setDescription('Whether you have an edge on the roll.'))

        .addBooleanOption(option =>
            option.setName('opposingedge')
                .setDescription('Whether your opponent has an edge on the roll.'))

        .addBooleanOption(option =>
            option.setName('snag')
                .setDescription('Whether you have a snag on the roll.'))

        .addBooleanOption(option =>
            option.setName('opposingsnag')
                .setDescription('Whether your opponent has a snag on the roll.'))

        .addIntegerOption(option =>
            option.setName('bonus')
                .setDescription('Add a Bonus to your roll (Minor Bonus: 2, Major Bonus: 4)'))

        .addIntegerOption(option =>
            option.setName('opposingbonus')
                .setDescription('Add a Bonus to your opponent\'s roll (Minor Bonus: 2, Major Bonus: 4)'))
        
        .addIntegerOption(option =>
            option.setName('penalty')
                .setDescription('Subtract a Penalty from your roll (Minor Penalty: 2, Major Penalty: 4)'))

        .addIntegerOption(option =>
            option.setName('opposingpenalty')
                .setDescription('Subtract a Penalty from your opposing roll (Minor Penalty: 2, Major Penalty: 4)')),

	async execute(interaction) {
        // Variables
        const target = interaction.options.getInteger('aptitude');
        const opposing = interaction.options.getInteger('opposingaptitude');
        const edge = interaction.options.getBoolean('edge') ?? false;
        const opposingEdge = interaction.options.getBoolean('opposingedge') ?? false;
		const snag = interaction.options.getBoolean('snag') ?? false;
        const opposingSnag = interaction.options.getBoolean('opposingsnag') ?? false;
        var bonus = interaction.options.getInteger('bonus') ?? false;
        var opposingBonus = interaction.options.getInteger('opposingbonus') ?? false;
		var penalty = interaction.options.getInteger('penalty') ?? false;
        var opposingPenalty = interaction.options.getInteger('opposingPenalty') ?? false;
		let roll = Math.floor(Math.random() * 20) + 1;
        let opposingRoll = Math.floor(Math.random() * 20) + 1;
		let edgeRoll = Math.floor(Math.random() * 20) + 1;
        let opposingEdgeRoll = Math.floor(Math.random() * 20) + 1;
        var msgArray = [];
        var results = [];
        //*###########################
        //* Your Roll
        
        //############################
        // Figure out bonus and/or penalty

        if (bonus && penalty) {
            if (bonus == penalty) { bonus = false; penalty = false; }
            else if (bonus > penalty) { bonus = (bonus - penalty); penalty = false; }
            else if (bonus < penalty) { penalty = (penalty - bonus); bonus = false; }
        }

        //###########################
        // Roll > Bonus
        if (bonus) {
            if (roll + bonus <= target) var rollTotal = roll + bonus;
            else if (roll - bonus <= target) var rollTotal = roll - bonus;
            else var rollTotal = roll + bonus;
            if (edgeRoll + bonus <= target) var edgeRollTotal = edgeRoll + bonus;
            else if (edgeRoll - bonus <= target) var edgeRollTotal = edgeRoll - bonus;
            else var edgeRollTotal = edgeRoll + bonus;

            //#########################
            // Roll > Bonus > Edge
            if (edge && !snag) {
                if (edgeRollTotal > rollTotal) { 
                    if (edgeRollTotal > target) {
                        if (rollTotal > target) msgArray.push(`You rolled a ${strikethrough(roll)} ${edgeRoll}: That\'s too high!`) && results.push(0);
                        else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll)) && results.push(roll);
                    } else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll) && results.push(edgeRoll);
                } else if (rollTotal > target) {
                    if (edgeRollTotal > target) msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!') && results.push(0);
                    else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll) && results.push(edgeRoll);
                } else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll)) && results.push(roll);
            }
            //##########################
            // Roll > Bonus > Snag
            else if (snag && !edge) {
                if (edgeRollTotal < roll) { 
                    if (edgeRollTotal <= target) {
                        if (rollTotal <= target) msgArray.push('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal) && results.push(edgeRollTotal);
                        else msgArray.push('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
                    } else msgArray.push('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else if (rollTotal <= target) {
                    if (edgeRollTotal <= target) msgArray.push('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal)) && results.push(rollTotal);
                    else msgArray.push('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else msgArray.push('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
            }
            // #########################
            // Roll > Bonus > No Edge/Snag
            else if (rollTotal >= target) msgArray.push('You rolled a ' + rollTotal + ': That\'s too high!') && results.push(0);
            else msgArray.push('You rolled a ' + rollTotal) && results.push(rollTotal);


        //#######################
        // Roll > Penalty
        } else if (penalty) {
            if (roll - penalty > target) var rollTotal = roll - penalty;
            else if (roll + bonus > target) var rollTotal = roll + penalty;
            else var rollTotal = roll - penalty;
            if (edgeRoll - penalty > target) var edgeRollTotal = edgeRoll - penalty;
            else if (edgeRoll + bonus > target) var edgeRollTotal = edgeRoll + penalty;
            else var edgeRollTotal = edgeRoll - penalty;

            //#########################
            // Roll > Penalty > Edge
            if (edge && !snag) {
                if (edgeRollTotal > rollTotal) { 
                    if (edgeRollTotal > target) {
                        if (rollTotal > target) msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!') && results.push(0);
                        else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll)) && results.push(roll);
                    } else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll) && results.push(edgeRoll);
                } else if (rollTotal > target) {
                    if (edgeRollTotal > target) msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!') && results.push(0);
                    else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll) && results.push(edgeRoll);
                } else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll)) && results.push(roll);
            }
            //##########################
            // Roll > Penalty > Snag
            else if (snag && !edge) {
                if (edgeRollTotal < roll) { 
                    if (edgeRollTotal <= target) {
                        if (rollTotal <= target) msgArray.push('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal) && results.push(edgeRollTotal);
                        else msgArray.push('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
                    } else msgArray.push('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else if (rollTotal <= target) {
                    if (edgeRollTotal <= target) msgArray.push('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal)) && results.push(rollTotal);
                    else msgArray.push('You rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else msgArray.push('You rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
            }

            //#########################
            // Roll > Penalty > No Edge/Snag
            else if (rollTotal >= target) msgArray.push('You rolled a ' + rollTotal + ': That\'s too high!') && results.push(0);
            else msgArray.push('You rolled a ' + rollTotal) && results.push(rollTotal);
        }

        //##########################
        // Roll > Edge
        if (edge && !snag) {
			if (edgeRoll > roll) { 
                if (edgeRoll > target) {
                    if (roll > target) msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!') && results.push(0);
                    else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll)) && results.push(roll);
                } else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll) && results.push(edgeRoll);
            } else if (roll > target) {
                if (edgeRoll > target) msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!') && results.push(0);
                else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll) && results.push(edgeRoll);
            } else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll)) && results.push(roll);
		}

        //#########################
        // Roll > Snag
		else if (snag && !edge) {
			if (edgeRoll < roll) { 
                if (edgeRoll <= target) {
                    if (roll <= target) msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll) && results.push(edgeRoll);
                    else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!') && results.push(0);
                } else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!') && results.push(0);
            } else if (roll <= target) {
                if (edgeRoll <= target) msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll)) && results.push(roll);
                else msgArray.push('You rolled a ' + strikethrough(roll) + ' ' + edgeRoll + ': That\'s too high!') && results.push(0);
            } else msgArray.push('You rolled a ' + roll + ' ' + strikethrough(edgeRoll) + ': That\'s too high!') && results.push(0);
		}

        //########################
        // Roll > No Bon/Pen or Edge/Snag
		else if (roll >= target) msgArray.push('You rolled a ' + roll + ': That\'s too high!') && results.push(0);
		else msgArray.push('You rolled a ' + roll) && results.push(roll);

        //*########################
        //* Your Opponent's Roll

        //############################
        // Figure out bonus and/or penalty

        if (opposingBonus && opposingPenalty) {
            if (opposingBonus == opposingPenalty) { opposingBonus = false; opposingPenalty = false; }
            else if (opposingBonus > opposingPenalty) { opposingBonus = (opposingBonus - opposingPenalty); opposingPenalty = false; }
            else if (opposingBonus < opposingPenalty) { opposingPenalty = (opposingPenalty - opposingBonus); opposingBonus = false; }
        }

        //###########################
        // Roll > Bonus
        if (opposingBonus) {
            if (opposingRoll+ opposingBonus <= opposing) var rollTotal =opposingRoll+ opposingBonus;
            else if (opposingRoll- opposingBonus <= opposing) var rollTotal =opposingRoll- opposingBonus;
            else var rollTotal =opposingRoll+ opposingBonus;
            if (opposingEdgeRoll+ opposingBonus <= opposing) var edgeRollTotal = opposingEdgeRoll+ opposingBonus;
            else if (opposingEdgeRoll- opposingBonus <= opposing) var edgeRollTotal = opposingEdgeRoll- opposingBonus;
            else var edgeRollTotal = opposingEdgeRoll+ opposingBonus;

            //#########################
            // Roll > Bonus > Edge
            if (opposingEdge && !opposingSnag) {
                if (edgeRollTotal > rollTotal) { 
                    if (edgeRollTotal > opposing) {
                        if (rollTotal > opposing) msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll+ ': That\'s too high!') && results.push(0);
                        else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll)) && results.push(opposingRoll);
                    } else msgArray.push('Your opponent rolled a ' + strikethrough(opposingRoll) + ' ' + opposingEdgeRoll) && results.push(opposingEdgeRoll);
                } else if (rollTotal > opposing) {
                    if (edgeRollTotal > opposing) msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll) + ': That\'s too high!') && results.push(0);
                    else msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll) && results.push(opposingEdgeRoll);
                } else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll)) && results.push(opposingRoll);
            }
            //##########################
            // Roll > Bonus > Snag
            else if (opposingSnag && !opposingEdge) {
                if (edgeRollTotal < opposingEdgeRoll) { 
                    if (edgeRollTotal <= opposing) {
                        if (rollTotal <= opposing) msgArray.push('Your opponent rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal) && results.push(edgeRollTotal);
                        else msgArray.push('Your opponent rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
                    } else msgArray.push('Your opponent rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else if (rollTotal <= opposing) {
                    if (edgeRollTotal <= opposing) msgArray.push('Your opponent rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal)) && results.push(rollTotal);
                    else msgArray.push('Your opponent rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else msgArray.push('Your opponent rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
            }
            // #########################
            // Roll > Bonus > No Edge/Snag
            else if (rollTotal >= opposing) msgArray.push('Your opponent rolled a ' + rollTotal + ': That\'s too high!') && results.push(0);
            else msgArray.push('Your opponent rolled a ' + rollTotal) && results.push(rollTotal);


        //#######################
        // Roll > Penalty
        } else if (opposingPenalty) {
            if (opposingRoll- opposingPenalty > opposing) var rollTotal =opposingRoll- opposingPenalty;
            else if (opposingRoll+ opposingBonus > opposing) var rollTotal =opposingRoll+ opposingPenalty;
            else var rollTotal =opposingRoll- opposingPenalty;
            if (opposingEdgeRoll- opposingPenalty > opposing) var edgeRollTotal = opposingEdgeRoll- opposingPenalty;
            else if (opposingEdgeRoll+ opposingBonus > opposing) var edgeRollTotal = opposingEdgeRoll+ opposingPenalty;
            else var edgeRollTotal = opposingEdgeRoll- opposingPenalty;

            //#########################
            // Roll > Penalty > Edge
            if (opposingEdge && !opposingSnag) {
                if (edgeRollTotal > rollTotal) { 
                    if (edgeRollTotal > opposing) {
                        if (rollTotal > opposing) msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll+ ': That\'s too high!') && results.push(0);
                        else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll)) && results.push(opposingRoll);
                    } else msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll) && results.push(opposingEdgeRoll);
                } else if (rollTotal > opposing) {
                    if (edgeRollTotal > opposing) msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll) + ': That\'s too high!') && results.push(0);
                    else msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll) && results.push(opposingEdgeRoll);
                } else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll)) && results.push(opposingRoll);
            }
            //##########################
            // Roll > Penalty > Snag
            else if (opposingSnag && !opposingEdge) {
                if (edgeRollTotal < opposingEdgeRoll) { 
                    if (edgeRollTotal <= opposing) {
                        if (rollTotal <= opposing) msgArray.push('Your opponent rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal) && results.push(edgeRollTotal);
                        else msgArray.push('Your opponent rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
                    } else msgArray.push('Your opponent rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else if (rollTotal <= opposing) {
                    if (edgeRollTotal <= opposing) msgArray.push('Your opponent rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal)) && results.push(rollTotal);
                    else msgArray.push('Your opponent rolled a ' + strikethrough(rollTotal) + ' ' + edgeRollTotal + ': That\'s too high!') && results.push(0);
                } else msgArray.push('Your opponent rolled a ' + rollTotal + ' ' + strikethrough(edgeRollTotal) + ': That\'s too high!') && results.push(0);
            }

            //#########################
            // Roll > Penalty > No Edge/Snag
            else if (rollTotal >= opposing) msgArray.push('Your opponent rolled a ' + rollTotal + ': That\'s too high!') && results.push(0);
            else msgArray.push('Your opponent rolled a ' + rollTotal) && results.push(rollTotal);
        }

        //##########################
        // Roll > Edge
        if (opposingEdge && !opposingSnag) {
			if (opposingEdgeRoll> opposingEdgeRoll) { 
                if (opposingEdgeRoll> opposing) {
                    if (opposingRoll> opposing) msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll+ ': That\'s too high!') && results.push(0);
                    else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll)) && results.push(opposingRoll);
                } else msgArray.push('Your opponent rolled a ' + strikethrough(opposingRoll) + ' ' + opposingEdgeRoll) && results.push(opposingEdgeRoll);
            } else if (opposingRoll> opposing) {
                if (opposingEdgeRoll> opposing) msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll) + ': That\'s too high!') && results.push(0);
                else msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingRoll) && results.push(opposingRoll);
            } else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll)) && results.push(opposingRoll);
		}

        //#########################
        // Roll > Snag
		else if (opposingSnag && !opposingEdge) {
			if (opposingEdgeRoll< opposingEdgeRoll) { 
                if (opposingEdgeRoll<= opposing) {
                    if (opposingRoll<= opposing) msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll) && results.push(opposingEdgeRoll);
                    else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll) + ': That\'s too high!') && results.push(0);
                } else msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll+ ': That\'s too high!') && results.push(0);
            } else if (opposingRoll<= opposing) {
                if (opposingEdgeRoll<= opposing) msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll)) && results.push(opposingRoll);
                else msgArray.push('Your opponent rolled a ' + strikethrough(opposingEdgeRoll) + ' ' + opposingEdgeRoll+ ': That\'s too high!') && results.push(0);
            } else msgArray.push('Your opponent rolled a ' +opposingRoll+ ' ' + strikethrough(opposingEdgeRoll) + ': That\'s too high!') && results.push(0);
		}

        //########################
        // Roll > No Bon/Pen or Edge/Snag
		else if (opposingRoll>= opposing) msgArray.push('Your opponent rolled a ' +opposingRoll+ ': That\'s too high!') && results.push(0);
		else msgArray.push('Your opponent rolled a ' + opposingEdgeRoll) && results.push(opposingEdgeRoll);

        //*########################
        //* Figure out who won.
        if (results[0] > results[1]) msgArray.push('You won the contest!');
        else if (results[0] < results[1]) msgArray.push('You lost the contest.');
        else if (results[0] == results[1]) msgArray.push('It was a tie.');
        else msgArray.push("We seem to have encountered an error.");

        await interaction.reply(msgArray.join('\n'));
	},
};