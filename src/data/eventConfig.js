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
		chance: 100,
		type: "choice",
		eventAction: "addSpace",
		title: "Hidden Space",
		body: "A local carhacker can add hidden space to your car.",

		// range 15% to 33% of current cash+inv value, curve is NORM_LO
		cost: [.15, .33, -7, 1.6,]
	},
	{
		chance: 100,
		type: "ripoff",
		eventAction: "ripoff",
		title: "You got ripped off!",
		get body() {
			const whoChoose = Math.floor(Math.random() * this.who.length)
			const whatChoose = Math.floor(Math.random() * this.what.length)
			return `${this.who[whoChoose]} ${this.what[whatChoose]}!`
		},
		who: [
			"Your cousin",
			"A local bent cop",
			"A dirty flatfoot",
			"Your rival",
			"A streetkid",
			"Some junky",
			"Yo mama",
			"A streetwalker",
			"Meatball",
			"Some musclehead",
			"Some glitter butt",
			"Some zillion head",
			"Some nanozite",
			"Some smash ass",
			"A cyberpsycho",
			"A foaming from the ears cyberpsycho",
			"3 hookers",
			"A priest, a nun and a rabbi",
			"Local angry parents",
			"Your crazy ex",
			"That dumb bitch sister of yours",
			"That bithead brother of yours",
			"Was that your mom?! She",
			"It's the price of doing business. Some jackass",
			"The entire Cult of Elon Musnt",
			"Nomads",
			"Gangers",
			"You wake up and they",
			"You weren't paying attention and they",
			"You without a gun and they",
			"Dammit, "
		],
		what: [
			"caught you off guard",
			"mugged your dumb ass",
			"got revenge",
			"finally made a play",
			"actually ran a pretty smart heist",
			"robbed you at knife point",
			"robbed you at gun point",
			"smacked you in the alley",
			"called the cops on you",
			"worked you over pretty good",
			"threw a weak punch and it was pretty funny, actually",
			"clocked you for no reason",
			"took a chance while you were stuck in traffic",
			"shot you in the ass",
			"tried to stab you in the neck",
			"jacked you while you were sleeping",
			"lifted a bunch of creds",
			"snuck off with some cash",
			"heisted your shit",
			"jacked your stuff",
			"carjacked you",
			"kicked down your door",
			"laid a trap",
			"roofied you",
			"skipped out on a delivery",
		],

		// range 10% to 25% of current cash+inv value, curve is NORM_LO
		cost: [.10, .65, -7, 1.6,]
	},
	// {
	// 	chance: 15,
	// 	type: "event",
	// 	title: "Random",
	// 	body: "[In the street] you [see] [a bully] [stealing] [candy] [from a baby].",
	// 	// eventAction: function () { console.log(`conlog: RANDOM EVENT`,) }
	// },
]