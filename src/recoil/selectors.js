import {selector} from "recoil"

import { player, stateBuysell } from "./atoms"

export const whichBuysell = selector({
	key: "whichBuysell",
	get: ({get}) => {
		return get(stateBuysell)
	},
})