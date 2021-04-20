import { dAny } from "../engines/dice"

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
		chance: 50,
		type: "storage",
		title: "Hidden Space",
		body: "bla bla hidden space in your car. Do you accept?",
		eventAction: function () { return dAny(4) + dAny(4) + dAny(4) + dAny(4) }
	}
]
