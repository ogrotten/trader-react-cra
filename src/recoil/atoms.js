import { atom } from "recoil"
import ITEMS from "../data/items.json"

const {
	START_MONEY,
	START_DEBT,
	START_INVENTORY,
	LOCATIONS,
	TURNS
} = require("../data/config")

export const stateBuysell = atom ({
	key: "stateBuysell",
	default: "buy"
})

export const player = atom({
	key: "player",
	default: [
		{
			turns: TURNS,
			current: 1,

			cash: START_MONEY,
			bank: 0,
			debt: START_DEBT,
			space: START_INVENTORY,
			location: LOCATIONS[0],

			// array index = item.id
			inv: Array(ITEMS.length).fill(0)
		}
	]
})
