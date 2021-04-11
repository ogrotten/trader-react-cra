import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"
import useModal from "../../hooks/useModal"

import Modal from "../Modal"

import "./Event.scss"

const Event = () => {
	const [currEvent, setCurrEvent] = useState({})
	const { eventList, addEvent, remvEvent, playerState, advanceTurn } = useContext(GameContext)
	const { modalShow, modalHide, isShowing } = useModal()

	const okAction = () => {
		console.log(`conlog: next plz`,)
		remvEvent()
		modalHide()
	}

	const modalNext = () => {
		if (eventList?.length > 0) {
			setCurrEvent({ ...eventList[0], type: "Event" })
			modalShow()
		}
		if (!eventList.length) {

		}
	}

	useEffect(() => {
		modalNext()
	}, [eventList])

	useEffect(() => {
		const newEvents = checkEventConditions(playerState, advanceTurn)
		if (newEvents.length) {
			addEvent(...newEvents)
		}
	}, [])

	return (
		<Modal data={currEvent} isShowing={isShowing} hide={modalHide} normal={false} okAction={okAction}>
			{currEvent.body}
		</Modal>
	)
}

export default Event

const checkEventConditions = (state, advanceTurn) => {
	const events = []
	/**
	 * Game Start
	 * Game Over
	 * More Storage
	 * Random Text
	 * Found Cache
	 * @returns
	 */
	switch (true) {
		// Game Start
		case state.current === 0:
			const gameStart = {
				type: "game",
				title: "Get started",
				body: "Starting the game",
				eventAction: advanceTurn()
			}
			events.push(gameStart)
			break;

		// End Game
		case state.current >= state.turns:
			const gameEnd = {
				type: "game",
				title: "Game Over",
				body: "Done.",
				eventAction: function () { console.log(`conlog: END GAME`,) }
			}
			events.push(gameEnd)
			break;

		default:
			break;
	}
	return events
}