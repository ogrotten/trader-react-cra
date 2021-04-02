import React, { useState, useEffect, createContext } from 'react'
import ITEMS from "../data/items.json"
import gameConfig from "../data/gameConfig"

const GameContext = createContext()

const {
	START_MONEY,
	START_DEBT,
	START_INVENTORY,
	LOCATIONS,
	TURNS
} = gameConfig

console.log(`gameConfig: `, gameConfig)

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

	useEffect(() => {
		console.log(`PLAYERSTATE: `, playerState)
	}, [playerState])

	const buyItem = (price, amount) => {
		const cost = price * amount
		setPlayerState((current) => {
			return {
				...current,
				cash: current.cash - cost
			}
		})
	}

	const sellItem = (price, amount) => {
		const profit = price * amount
		setPlayerState((current) => {
			return {
				...current,
				cash: current.cash + profit
			}
		})
	}

	const changeInventory = (id, count) => {
		console.log(`conlog: `, id, count)
		const newInv = [...playerState.inv]
		newInv[id] += count
		setPlayerState((current) => {
			return {
				...current,
				inv: newInv
			}
		})
	}

	const changeLocation = (newLoc) => {
		if (playerState.location === newLoc) {
			let nextTurn = playerState.current
			if ((nextTurn + 1) > playerState.turns) {
				console.log(`conlog: END GAME CONDITION`,)
			} else {
				nextTurn++
			}
			setPlayerState({
				...playerState,
				location: newLoc,
				current: nextTurn
			})
		}
	}

	return (
		<GameContext.Provider
			value={{
				playerState,
				buyItem, sellItem,
				changeLocation, changeInventory
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export { GameContext, GameProvider }