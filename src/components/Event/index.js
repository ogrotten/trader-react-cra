import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"
import useModal from "../../hooks/useModal"
import { d100 } from "../../engines/dice"
import { price } from "../MarketTable"
import { eventConfig } from "../../data/eventConfig"

import Modal from "../Modal"

import "./Event.scss"

const Event = () => {
	const [currEvent, setCurrEvent] = useState({})
	const { eventList, addEvent, remvEvent, playerState, playerState: { currTurn, cash }, advanceTurn, addSpace } = useContext(GameContext)
	const contextObj = useContext(GameContext)
	const { modalShow, modalHide, isShowing } = useModal()

	const okAction = () => {
		remvEvent()
		modalHide()
	}

	const modalNext = () => {
		if (eventList?.length > 0) {
			setCurrEvent({
				...eventList[0],
				type: eventList[0].type || "event"
			})
			modalShow()
		}
		if (!eventList.length) {

		}
	}

	useEffect(() => {
		modalNext()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventList])

	useEffect(() => {
		const actionFunctions = {
			advanceTurn,
			addSpace
		}
		const newEvents = checkEventConditions(playerState, actionFunctions)
		if (newEvents.length) {
			newEvents.forEach(ev => { addEvent(ev) })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currTurn])

	const checkEventConditions = () => {
		/**
		 * Game Start
		 * Game Over
		 * More Storage
		 * Random Text
		 * Found Cache
		 * Holiday
		 */

		const events = []

		// Game Start
		if (playerState.currTurn === 0) {
			const gameStart = {
				type: "event",
				title: "Get started",
				body: "Starting the game",
				// eventAction: actionFunctions["advanceTurn"]()
			}
			events.push(gameStart)
		}

		// End Game
		if (playerState.currTurn > playerState.maxTurns) {
			const gameEnd = {
				type: "event",
				title: "Game Over",
				body: "Done.",
				eventAction: function () { console.log(`conlog: END GAME`,) }
			}
			events.push(gameEnd)
		}

		// Regular Game Turn
		if ((playerState.currTurn < playerState.maxTurns) /* && (playerState.currTurn !== 0) */) {
			eventConfig.forEach(item => {
				const pushItem = { ...item }
				const check = d100()
				console.log(`> Event ${item.title}: ${item.chance} / ${check}`, check)
				if (check < item.chance) {
					console.log(`> > Event Hit: `, item.title)
					pushItem.eventAction = contextObj[item.eventAction]
					if (item.cost.length) {
						const cost = price(
							item.cost[0] * playerState.value,
							item.cost[1] * playerState.value,
							item.cost[2],
							item.cost[3]
						)
						if (cost > cash) {
							pushItem.body = <div>
								<p>{item.body} But you can't afford it!</p>
								<p>Cost: ${cost}, you have ${playerState.cash}</p>
							</div>
							pushItem.cost = null
							pushItem.type = "special"
						} else {
							pushItem.body = <div>
								<p>{item.body}  Do you accept?</p>
								<p>Cost: ${cost}</p>
							</div>
							pushItem.cost = cost
						}
					}
					events.push(pushItem)
				}
			})
		}


		return events
	}

	return (
		<Modal data={currEvent} isShowing={isShowing} hide={modalHide} normal={false} okAction={okAction}>
			{currEvent.body}
		</Modal>
	)
}

export default Event

