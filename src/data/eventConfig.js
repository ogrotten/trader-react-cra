// import { dAny } from "../engines/dice"

/**
 * Game Start
 * Game Over
 * More Storage
 * Random Text
 * Found Cache
 * Holiday
 */

export const eventConfig = [
	{
		chance: 10,
		type: "choice",
		eventAction: "addSpace",
		title: "Hidden Space",
		body: "A local carhacker can add hidden space to your car.",
		// eventAction: function () {
		// 	console.log(`Add ${dAny(4) + dAny(4) + dAny(4) + dAny(4)} spaces!`)
		// }
		cost: [.15, .33, -7, 1.6,]
	},
	{
		chance: 100,
		type: "event",
		title: "Random",
		body: "[In the street] you [see] [a bully] [stealing] [candy] [from a baby].",
		eventAction: function () { console.log(`conlog: RANDOM EVENT`,) }
	},
]
