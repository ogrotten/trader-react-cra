import { atom } from "recoil"
import ITEMS from "../data/items.json"

const {
	START_MONEY,
	START_DEBT,
	START_INVENTORY,
	LOCATIONS,
	TURNS
} = require("../data/config")

export const smallModalInfo = atom({
	key: "smallModalInfo",
	default: "buy"
})

export const playerState = atom({
	key: "player",
	default: {
		turns: TURNS,
		current: 1,

		cash: START_MONEY,
		bank: 0,
		debt: START_DEBT,
		space: START_INVENTORY,
		location: 1,

		// array index = item.id
		inv: Array(ITEMS.length).fill(0)
	}
})

export const location = atom({
	key: "location",
	default: 0,
})