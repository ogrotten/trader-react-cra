import {selector} from "recoil"

import { player, smallModalInfo } from "./atoms"

export const getModalInfo = selector({
	key: "getModalInfo",
	get: ({get}) => {
		return get(smallModalInfo)
	},
})