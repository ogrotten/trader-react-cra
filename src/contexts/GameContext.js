import React, { useState, useEffect, createContext } from 'react'
import ITEMS from "../data/items.json"

const GameContext = createContext()

const {
	START_MONEY,
	START_DEBT,
	START_INVENTORY,
	LOCATIONS,
	TURNS
} = require("../data/config")

const GameProvider = ({ children }) => {
	const [playerState, setPlayerState] = useState({
		turns: TURNS,
		current: 1,

		cash: START_MONEY,
		bank: 0,
		debt: START_DEBT,
		space: START_INVENTORY,
		location: 1,

		// array index = item.id
		inv: Array(ITEMS.length).fill(0)
	})

	const buyItem = (price, amount) => {
		const cost = price * amount
		if (playerState.cash >= price) {
			setPlayerState((current) => {
				return {
					...current,
					cash: current.cash - cost
				}
			})
			return true
		} else {
			console.log(`conlog: not enuf money!!`,)
			return false
		}
	}

	const changeLoc = (newLoc) => {
		setPlayerState({ ...playerState, location: newLoc })
	}

	return (
		<GameContext.Provider
			value={{ playerState, buyItem, changeLoc }}
		>
			{children}
		</GameContext.Provider>
	)
}

export { GameContext, GameProvider }