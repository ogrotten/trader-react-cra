import React, { useState, useEffect, createContext } from 'react'

import gameConfig from "../data/gameConfig"
import ITEMS from "../data/items"
import RANGES from "../data/pricerange"
gameConfig.ITEMS = ITEMS
gameConfig.RANGES = RANGES

const GameContext = createContext()
const defaultPlayerState = {
	maxTurns: gameConfig.TURNS,
	currTurn: -1,

	cash: gameConfig.START_MONEY,
	bank: 0,
	debt: gameConfig.START_DEBT,
	space: gameConfig.START_INVENTORY,
	position: 1,

	// array index = item.id
	inv: Array(gameConfig.ITEMS.length).fill(0)
}
console.table(gameConfig.ITEMS)


const GameProvider = ({ children }) => {
	const [playerState, setPlayerState] = useState(defaultPlayerState)
	const [eventList, setEventList] = useState([])

	useEffect(() => {
		console.log(`conlog: `, playerState)
	})

	useEffect(() => {
		console.log(`conlog: PLAYERSTATE`, playerState)
	}, [playerState])

	const addEvent = (newEvent) => {
		setEventList((oldlist) => [...oldlist, newEvent])
	}

	const remvEvent = () => {
		const newList = [...eventList]
		newList.splice(0, 1)
		setEventList([...newList])
	}

	const startGame = () => {
		if (playerState.currTurn < 0) {
			return true
		} else {
			return false
		}
	}

	const endGame = () => {
		if (playerState.currTurn >= playerState.maxTurns) {
			return true
		} else {
			return false
		}
	}

	const advanceTurn = () => {
		setPlayerState({
			...playerState,
			currTurn: playerState.currTurn + 1
		})
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
		setPlayerState({
			...playerState,
			position: +newLoc,
			currTurn: playerState.currTurn + 1
		})
	}

	return (
		<GameContext.Provider
			value={{
				gameConfig,
				playerState, setPlayerState,
				eventList, addEvent, remvEvent,
				startGame, endGame, advanceTurn,
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