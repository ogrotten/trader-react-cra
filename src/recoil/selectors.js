import { selector } from "recoil"

import { player, smallModalInfo, location } from "./atoms"

export const getModalInfo = selector({
	key: "getModalInfo",
	get: ({ get }) => {
		return get(smallModalInfo)
	},
})

export const doLocation = selector({
	key: "doLocation",
	get: ({ get }) => get(location),
	set: ({ set }, newLoc) => {
		console.log(`conlog: doLocation`, newLoc)
		set(location, newLoc)
	}
})