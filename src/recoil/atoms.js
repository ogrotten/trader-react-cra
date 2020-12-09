import { atom } from "recoil"
import ITEMS from "../../data/items.json"

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