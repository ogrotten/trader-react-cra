import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"
import useModal from "../../hooks/useModal"

import Modal from "../Modal"

import "./Event.scss"

const Event = () => {
	const [currEvent, setCurrEvent] = useState({})
	const { eventList, remvEvent } = useContext(GameContext)
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
			// modalHide()
		}
	}

	useEffect(() => {
		modalNext()
	}, [eventList])

	useEffect(() => {
		modalNext()
	}, [])

	return (
		// <Modal data={data} isShowing={isShowing} hide={toggleShow} normal={false} okAction={endTransaction}>
		<Modal data={currEvent} isShowing={isShowing} hide={modalHide} normal={false} okAction={okAction}>
			{currEvent.body}
		</Modal>
	)
}

export default Event