import React, { useState, useEffect, useContext } from 'react'
import Modal from "../Modal"

import { GameContext } from "../../contexts/GameContext"
import useModal from "../../hooks/useModal"

import "./Event.scss"

const Event = () => {
	const [currEvent, setCurrEvent] = useState({})
	const [localEventList, setlocalEventList] = useState([])
	const { isShowing, toggleShow } = useModal()

	const { eventList, remvEvent } = useContext(GameContext)
	const context = useContext(GameContext)

	useEffect(() => {
		console.log(`conlog: Event USEE`, eventList)
		if (eventList?.length > 0) {
			setCurrEvent({ ...eventList[0] })
		}
	}, [...Object.values(context)])

	useEffect(() => {
		if (Object?.values(currEvent)?.length > 0) {
			toggleShow()
		}
		// console.log(`conlog: currEvent`, currEvent, isShowing)
	}, [currEvent])

	return (
		// <Modal data={data} isShowing={isShowing} hide={toggleShow} normal={false} okAction={endTransaction}>
		<Modal data={currEvent} isShowing={isShowing} hide={toggleShow} normal={false}>
			{currEvent.body}
		</Modal>
	)
}

export default Event