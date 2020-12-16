import {selector} from "recoil"

import { smallModalInfo } from "./atoms"

export const getModalInfo = selector({
	key: "getModalInfo",
	get: ({get}) => {
		return get(smallModalInfo)
	},
})