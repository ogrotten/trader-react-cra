import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"
import useModal from "../../hooks/useModal"
import { d100 } from "../../engines/dice"
import { eventConfig } from "../../data/eventConfig"

import Modal from "../Modal"

import "./Event.scss"

const Event = () => {
	const [currEvent, setCurrEvent] = useState({})
	const { eventList, addEvent, remvEvent, playerState, playerState: { currTurn }, advanceTurn, addSpace } = useContext(GameContext)
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
			addEvent(...newEvents)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currTurn])

	return (
		<Modal data={currEvent} isShowing={isShowing} hide={modalHide} normal={false} okAction={okAction}>
			{currEvent.body}
		</Modal>
	)
}

export default Event

const checkEventConditions = (state, actionFunctions) => {
	/**
	 * Game Start
	 * Game Over
	 * More Storage
	 * Random Text
	 * Found Cache
	 * Holiday
	 */

	const events = []

	switch (true) {
		// Game Start
		case state.currTurn === 0:
			const gameStart = {
				type: "game",
				title: "Get started",
				body: "Starting the game",
				eventAction: actionFunctions["advanceTurn"]()
			}
			events.push(gameStart)
			break;

		// End Game

		case state.currTurn > state.maxTurns:
			const gameEnd = {
				type: "game",
				title: "Game Over",
				body: "Done.",
				eventAction: function () { console.log(`conlog: END GAME`,) }
			}
			events.push(gameEnd)
			break;

		default:
			eventConfig.forEach(item => {
				if (d100() < item.chance) {
					console.log(`Event Hit: `, item.title)
					item.eventAction = actionFunctions[item.type]
					events.push(item)
				}
			})
	}



	return events
}