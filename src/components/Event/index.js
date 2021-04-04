import React, { useState, useContext } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"

import "./Event.scss"

const Event = () => {
	const [currEvent, setCurrEvent] = useState({})
	const { eventList, remvEvent } = GameContext

	useEffect(() => {
		setCurrEvent({ ...eventList[0] })
		remvEvent(0)
	}, [eventList])

	useEffect(() => {
		console.log(`conlog: newdata`, data)
	}, [currEvent])

	return (
		<Modal data={currEvent} isShowing={isShowing} hide={toggleShow} normal={true}>
			{currEvent.body}
		</Modal>
	)
}

export default Event