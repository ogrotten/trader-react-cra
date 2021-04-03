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
		console.table(playerState)
	}, [playerState])

	const endGame = () => {
		if (playerState.current >= playerState.turns) {
			return true
		} else {
			return false
		}
	}

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
		const newInv = [...playerState.inv]
		newInv[id] += count
		setPlayerState((current) => {
			return {
				...current,
				inv: newInv
			}
		})
	}

	const remainingSpace = () => {
		return playerState.inv.reduce(
			(acc, curr) => acc + curr
		)
	}

	const changeLocation = (newLoc) => {
		if (playerState.location !== +newLoc) {
			setPlayerState({
				...playerState,
				location: +newLoc,
				current: playerState.current + 1
			})
		}
	}

	return (
		<GameContext.Provider
			value={{
				playerState,
				endGame,
				buyItem, sellItem,
				changeInventory, remainingSpace,
				changeLocation,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export { GameContext, GameProvider }