import React, { useState, useEffect, createContext } from 'react'
import { updatedDiff } from 'deep-object-diff'
import { d100, dAny } from "../engines/dice"

import gameConfig from "../data/gameConfig"
import tickerConfig from "../data/tickerConfig"
import ITEMS from "../data/items"
import RANGES from "../data/pricerange"
gameConfig.ITEMS = ITEMS
gameConfig.RANGES = RANGES

const GameContext = createContext()
const defaultPlayerState = {
	maxTurns: gameConfig.TURNS,
	currTurn: -1,

	cash: gameConfig.START_MONEY,	// cash on hand
	worth: gameConfig.START_MONEY,	// total value of inventory & cash
	bank: 0,
	debt: 0,
	space: gameConfig.START_INVENTORY,
	position: 1,
	flags: {
		shark: false,
	},

	// inv: array index = item.id
	inv: Array(gameConfig.ITEMS.length).fill(0),
}
console.table(gameConfig.ITEMS)


const GameProvider = ({ children }) => {
	const [playerState, setPlayerState] = useState(defaultPlayerState)
	const [oldPlayerState, setOldPlayerState] = useState(playerState)
	const [turn, setTurn] = useState(defaultPlayerState.currTurn)
	const [flags, setFlags] = useState({
		shark: false,
	})
	const [eventList, setEventList] = useState([])
	const [tickerList, setTickerList] = useState([])
	const [log, setLog] = useState([])

	// useEffect(() => {
	// 	console.log()
	// }, [eventList])

	useEffect(() => {
		if (playerState.currTurn !== turn) {

			// Do New Turn stuff.
			const newturn = { ...playerState }
			setPlayerState({
				...newturn,
				// Interest calc
				bank: Math.floor(newturn.bank += newturn.bank *= gameConfig.BANK_INTEREST),
				debt: Math.floor(newturn.debt += newturn.debt *= gameConfig.DEBT_INTEREST),
			})
			setFlags({ ...flags, shark: false })
			// const temp = tickerConfig[dAny(tickerConfig.length - 1)].text
			const temp = [tickerConfig[playerState.currTurn % tickerConfig.length].text]
			setTickerList(() => [...temp])

			setTurn(playerState.currTurn)
		}

		const newlog = [...log]
		const updiff = updatedDiff(oldPlayerState, playerState)
		// const updiffInv = updatedDiff(oldPlayerState.inv, playerState.inv)

		if (playerState.currTurn >= 0 && Object.keys(updiff).length > 0) {
			if (!Array.isArray(newlog[playerState.currTurn])) {
				newlog[playerState.currTurn] = []
			}
			newlog[playerState.currTurn].push(updiff)

			setLog(newlog)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerState])

	// useEffect(() => {
	// 	// Do New Turn stuff.
	// 	if (playerState.currTurn !== oldPlayerState.currTurn) {
	// 		console.log(`conlog: NEWTURN `,)

	// 	}
	// }, [turn])

	//#region location
	const startGame = () => {
		if (playerState.currTurn < 0) {
			return true
		} else {
			return false
		}
	}

	const endGame = () => {
		if (playerState.currTurn > playerState.maxTurns) {
			return true
		} else {
			return false
		}
	}

	const addEvent = (newEvent) => {
		setEventList((oldlist) => [...oldlist, newEvent])
	}

	const remvEvent = () => {
		const newList = [...eventList]
		const tick = newList.splice(0, 1)
		manageTicker(tick[0])
		setEventList([...newList])
	}

	const manageTicker = (item) => {
		setTickerList((oldlist) => [...oldlist, item.ticker])
	}

	const advanceTurn = () => {
		setOldPlayerState(playerState)
		setPlayerState({
			...playerState,
			currTurn: playerState.currTurn + 1
		})
	}

	const buyItem = (price, amount) => {
		const cost = price * amount
		setOldPlayerState(playerState)
		setPlayerState((current) => {
			return {
				...current,
				cash: current.cash - cost
			}
		})
	}

	const sellItem = (price, amount) => {
		const profit = price * amount
		setOldPlayerState(playerState)
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
		setOldPlayerState(playerState)
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

	const addSpace = (cost) => {
		if (cost) {
			const added = dAny(4) + dAny(4) + dAny(4) + dAny(4)
			setOldPlayerState(playerState)
			setPlayerState({
				...playerState,
				space: playerState.space + added,
				cash: playerState.cash - cost
			})
		}
	}
	//#endregion
	const changeLocation = (newLoc) => {
		newLoc = +newLoc
		setOldPlayerState({ ...playerState })
		setPlayerState({
			...playerState,
			position: newLoc,
			currTurn: playerState.currTurn + 1
		})
	}

	const changeBank = (amt) => {
		setOldPlayerState({ ...playerState })
		setPlayerState({
			...playerState,
			bank: playerState.bank + amt,
			cash: playerState.cash - amt
		})
	}

	const changeDebt = (amt) => {
		setFlags({ ...flags, shark: true })
		setOldPlayerState({ ...playerState })
		setPlayerState({
			...playerState,
			debt: playerState.debt - amt,
			cash: playerState.cash - amt,
		})
	}

	const changeFlag = (item, status) => {
		setPlayerState({
			...playerState,
			flags: {
				[item]: status
			}
		})
	}

	const changeNetWorth = (amt) => {
		setOldPlayerState({ ...playerState })
		setPlayerState({
			...playerState,
			worth: (playerState.worth * 0) + amt,
		})
	}

	const ripoff = (cost) => {
		setOldPlayerState(playerState)
		setPlayerState((current) => {
			return {
				...current,
				cash: current.cash - cost
			}
		})
	}

	return (
		<GameContext.Provider
			value={{
				log,
				gameConfig,
				playerState, setPlayerState,
				eventList, addEvent, remvEvent,
				tickerList, manageTicker,
				startGame, endGame, advanceTurn,
				buyItem, sellItem,
				changeInventory,
				addSpace, remainingSpace,
				changeLocation,
				changeBank, changeDebt, flags,
				changeNetWorth, changeFlag,
				ripoff
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export { GameContext, GameProvider }

