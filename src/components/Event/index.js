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
	const { eventList, addEvent, remvEvent, playerState, playerState: { cash }, advanceTurn, addSpace } = useContext(GameContext)
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
	}, [playerState.worth])

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
				get ticker() {
					return [
						"First Post!",
						"First day on the job",
						"Gettin Started",
						"A new day",
						"Day One"
					][Math.floor(Math.random() * 5)]
				}
			}
			events.push(gameStart)

			// No non market events.
			// return events
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

			// No non market events.
			return events
		}

		// Regular Game Turn
		if ((playerState.currTurn < playerState.maxTurns) /* && (playerState.currTurn !== 0) */) {
			eventConfig.forEach(item => {
				const pushItem = { ...item }
				const check = d100()
				// console.log(`> Event ${item.title}: ${item.chance} / ${check}`, check)
				if (check < item.chance) {
					// take the configged eventAction and either push the function 
					// or use that name of function from Context methods.
					if (typeof pushItem.eventAction != "function") {
						pushItem.eventAction = contextObj[item.eventAction]
					}
					if (typeof pushItem.cancelAction != "function") {
						pushItem.cancelAction = "remvEvent"
					}

					// it blows out here without a cost array in the event data
					// need to genericize the returned event data.
					if (item.type === "ripoff") {
						const cost = price(
							item.cost[0] * playerState.cash,
							item.cost[1] * playerState.cash,
							item.cost[2],
							item.cost[3]
						)
						const settext = item.body
						pushItem.body = <>
							<p>{settext}</p>
							<p>They got away with {cost}!</p>
						</>
						pushItem.ticker = settext
						pushItem.cost = cost
						pushItem.type = "event"
					} else if (item.cost && item.cost.length) {
						const cost = price(
							item.cost[0] * playerState.worth,
							item.cost[1] * playerState.worth,
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

					// set random event data for the ticker.

					events.push(pushItem)
				}
			})
		}


		return events
	}

	return (
		<Modal data={currEvent} isShowing={isShowing} hide={modalHide} normal={false} okAction={okAction}>
			<p>{currEvent.body}</p>
		</Modal>
	)
}

export default Event

